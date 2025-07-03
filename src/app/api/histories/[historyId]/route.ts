import { db } from "@/lib/db";
import { HistoryModel } from "@/model/HistoryModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.query(
      "SELECT id, title, description FROM history Where id = ? "
    );
    const rows = result[0] as HistoryModel[];
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("erreur MySql : ", error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 }
    );
  }
}
