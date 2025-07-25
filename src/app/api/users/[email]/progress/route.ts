import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
