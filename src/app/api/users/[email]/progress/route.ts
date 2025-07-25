import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ProgressModel } from "@/model/ProgressModel";

type Params = {
  params: { email: string };
};

export async function Get(req: Request, { params }: Params) {
  const { email } = params;
  const url = new URL(req.url);
  const historyId = url.searchParams.get("historyId");

  if (!historyId) {
    return NextResponse.json({ error: "history_id manquant" }, { status: 400 });
  }

  try {
    const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    const userRows = rows as { id: number }[];

    if (!Array.isArray(userRows) || userRows.length === 0)
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );

    const userId = userRows[0].id;

    const [progressRows] = await db.query(
      "SELECT * FROM progress WHERE user_id = ? AND history_id = ?",
      [userId, historyId]
    );

    if (!Array.isArray(progressRows) || progressRows.length === 0)
      return NextResponse.json(
        { error: "Aucune progression trouvée" },
        { status: 404 }
      );

    return NextResponse.json(progressRows[0]);
  } catch (error) {
    console.error("Erreur GET progression:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: Params) {
  const { email } = params;
  const { step_id, history_id, object_id } = await req.json();

  try {
    const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    const userRows = rows as { id: number }[];

    if (!Array.isArray(userRows) || userRows.length === 0)
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );

    const userId = userRows[0].id;

    const [otherRows] = await db.query(
      "SELECT * FROM progress WHERE user_id = ? AND history_id = ?",
      [userId, history_id]
    );

    const existingRows = otherRows as ProgressModel[];

    if (existingRows.length > 0) {
      return NextResponse.json(
        { error: "Progression déjà existante" },
        { status: 400 }
      );
    }
    await db.query(
      "INSERT INTO progress (user_id, history_id, step_id, object_id) VALUES (?, ?, ?, ?)",
      [userId, history_id, step_id, object_id]
    );

    return NextResponse.json({ message: "Progression créée" });
  } catch (error) {
    console.error("Erreur POST progression:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
export async function PATCH(req: Request, { params }: Params) {
  const { email } = params;
  const { step_id, object_id, history_id } = await req.json();

  try {
    const [addedRows] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    const userRows = addedRows as { id: number }[];

    if (!Array.isArray(userRows) || userRows.length === 0)
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );

    const userId = userRows[0].id;

    const [progressRows] = await db.query(
      "SELECT id FROM progress WHERE user_id = ? AND history_id = ?",
      [userId, history_id]
    );

    const inProgressRows = progressRows as ProgressModel[];

    if (inProgressRows.length === 0) {
      return NextResponse.json(
        { error: "Progression inexistante" },
        { status: 404 }
      );
    }
    await db.query(
      "UPDATE progress SET step_id = ?, object_id = ? WHERE user_id = ? AND history_id = ?",
      [step_id, object_id, userId, history_id]
    );

    return NextResponse.json({ message: "Progression mise à jour" });
  } catch (error) {
    console.error("Erreur PATCH progression:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
