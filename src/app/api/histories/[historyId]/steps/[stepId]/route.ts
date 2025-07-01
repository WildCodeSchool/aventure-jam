import { db } from "@/lib/db";
import { StepModel } from "@/model/StepModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.query(
      "SELECT id, texte, history_id, pnj, background FROM etape WHERE id = ?"
    );
    const rows = result[0] as StepModel[];
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("erreur MySql : ", error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 }
    );
  }
}
