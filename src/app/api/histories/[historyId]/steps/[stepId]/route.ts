import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ historyId: number; stepId: number }> }
) {
  const { historyId, stepId } = await params;

  console.log("hello");

  try {
    const [rows] = await db.query(
      "SELECT id, texte, hystory_id, pnj, background FROM etape WHERE id = ?"
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
