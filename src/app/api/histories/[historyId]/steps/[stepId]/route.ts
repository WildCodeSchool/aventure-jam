import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, texte, hystory_id, pnj, background FROM etape"
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
