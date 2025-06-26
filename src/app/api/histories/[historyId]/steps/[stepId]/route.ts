import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { historyId: number; stepId: number } }
) {
  const { stepId } = params;

  console.log("hello");

  try {
    const [rows] = await db.query(
      "SELECT id, texte, history_id, pnj, background FROM etape WHERE id = ?"[
        stepId
      ]
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("erreur MySql : ", error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 }
    );
  }
}
