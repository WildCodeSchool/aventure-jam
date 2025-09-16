import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = {
  params: { email: string; historyId: string };
};

export async function GET(_req: Request, { params }: Params) {
  const { email, historyId } = await params;

  try {
    const result = await db.query(
      `SELECT p.*, u.email FROM progress p JOIN users u ON p.user_id = u.id WHERE u.email = ? AND p.history_id = ? ORDER BY p.id DESC LIMIT 1`,
      [email, historyId]
    );
    const rows = result[0] as any;

    return NextResponse.json(rows[0] || null);
  } catch (error) {
    console.error("erreur MySql : ", error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 }
    );
  }
}
