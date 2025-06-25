import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, texte, etape_id, object_id FROM choice"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("erreur MySql : ", error);
    return NextResponse.json({ error: "ca marche pas !!!!" }, { status: 500 });
  }
}
