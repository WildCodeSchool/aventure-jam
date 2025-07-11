import { infoMessages } from "@/data/responseMessages"
import { db } from "@/lib/db"
import { dbUser } from "@/model/dbUserModel"
import { NextResponse, NextRequest } from "next/server"


export async function GET(request: NextRequest) {
    const url = await request.nextUrl.pathname
    const email = url.split("/").pop()

    try {
        const [rows] = await db.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        )
        const results = Array.isArray(rows) ? (rows as dbUser[]) : []
        return NextResponse.json(results[0])
    } catch (error) {
        console.error("Erreur MySQL :", error)
        return NextResponse.json({ error: infoMessages.server }, { status: 500 })
    }
}