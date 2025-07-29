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

export async function POST(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const pathParts = pathname.split("/");
    const historyId = pathParts.pop();
    const email = pathParts.at(-2);

    try {
        const body = await request.json();
        const { objectId } = body;

        if (!objectId) {
            return NextResponse.json({ error: "objectId manquant" }, { status: 400 });
        }

        await db.query(
            'INSERT INTO inventory (is_used, user_id, object_id, history_id) VALUES (0, (SELECT id FROM users WHERE email = ?), ?, ?)',
            [email, objectId, historyId]
        );

        return NextResponse.json({ message: "Objet ajouté à l'inventaire." });
    } catch (error) {
        console.error("Erreur MySQL :", error);
        return NextResponse.json({ error: infoMessages.server }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const pathParts = pathname.split("/");
    const historyId = pathParts.pop();
    const email = pathParts.at(-2);

    try {
        const body = await request.json();
        const { objectIds } = body;

        if (!Array.isArray(objectIds) || objectIds.length === 0) {
            return NextResponse.json({ error: "Liste d'objets vide ou invalide." }, { status: 400 });
        }

        for (const objectId of objectIds) {
            await db.query(
                "DELETE FROM inventory WHERE (SELECT id FROM users WHERE email = ?) = ? AND object_id = ? AND history_id = ? LIMIT 1",
                [email, objectId, historyId]
            );
        }

        return NextResponse.json({ message: "Objets supprimés avec succès." });
    } catch (error) {
        console.error("Erreur MySQL :", error);
        return NextResponse.json({ error: infoMessages.server }, { status: 500 });
    }
}