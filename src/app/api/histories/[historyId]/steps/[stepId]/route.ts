import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { historyId: string; stepId: string } }
) {
  const { stepId } = await params;

  try {
    const [rows] = await db.query("SELECT * FROM etape WHERE id = ?", [
      parseInt(stepId),
    ]);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("erreur MySql : ", error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 }
    );
  }
}
