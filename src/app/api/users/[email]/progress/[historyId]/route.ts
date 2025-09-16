import { db } from "@/lib/db";
import { ProgressModel } from "@/model/ProgressModel";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { email: string; historyId: string };
};

export async function GET(_req: Request, { params }: Params) {
  const { email, historyId } = await params;

  try {
    const [rows] = await db.query(
      `SELECT p.id, p.history_id, p.step_id, p.object_id, p.user_id FROM progress p JOIN users u ON p.user_id = u.id WHERE u.email = ? AND p.history_id = ?`,
      [email, historyId]
    );
    const results = Array.isArray(rows) ? (rows as ProgressModel[]) : [];

    return NextResponse.json(results[0] || null);
  } catch (error) {
    console.error("erreur MySql : ", error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const { historyId, email } = await params;
  const { step_id, object_id = null } = await req.json();

  try {
    const [userRows] = await db.query(`SELECT id FROM users WHERE email = ?`, [
      email,
    ]);
    const users = Array.isArray(userRows) ? (userRows as { id: number }[]) : [];
    if (users.length === 0) {
      return NextResponse.json(
        { error: "utilisateur non trouvé" },
        { status: 404 }
      );
    }
    const userId = users[0].id;
    const [result] = await db.query(
      `INSERT INTO progress (history_id, step_id, object_id, user_id) 
       VALUES (?, ?, ?, ?)`,
      [historyId, step_id, object_id, userId]
    );
    return NextResponse.json({
      message: "Progression créée",
      id: (result as { insertId: number }).insertId,
    });
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { historyId, email } = await params;
  const { step_id, object_id = null } = await req.json();

  try {
    await db.query(
      `UPDATE progress p JOIN users u ON p.user_id = u.id SET p.step_id = ?, p.object_id = ? WHERE u.email = ? AND p.history_id = ?`,
      [step_id, object_id, email, historyId]
    );

    return NextResponse.json({ message: "Progression mise à jour" });
  } catch (error) {
    console.error("Erreur MySQL : ", error);
    return NextResponse.json(
      { error: "Internal Servor Error" },
      { status: 500 }
    );
  }
}
