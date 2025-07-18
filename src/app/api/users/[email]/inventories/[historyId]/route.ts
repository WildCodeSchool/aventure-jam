import { infoMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const { pathname } = await request.nextUrl;
    const pathParts = pathname.split("/");
    const historyId = pathParts.pop()
    const email = pathParts.at(-2);

    try {
        const [rows] = await db.query(
            `SELECT inventory.*, object.image, object.name FROM inventory JOIN object ON inventory.object_Id = object.id JOIN users ON users.id = inventory.user_id WHERE users.email = ? AND inventory.history_Id = ?`,
            [email, historyId]
        );
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Erreur MySQL :", error);
        return NextResponse.json({ error: infoMessages.server }, { status: 500 });
    }
}