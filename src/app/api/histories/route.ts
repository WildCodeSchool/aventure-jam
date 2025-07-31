import { db } from "@/lib/db";
import { HistoryModel } from "@/model/HistoryModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT id, title, description FROM history");
    return NextResponse.json(rows as HistoryModel[]);
  } catch (error) {
    console.error("erreur MySql : ", error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 }
    );
  }
}
