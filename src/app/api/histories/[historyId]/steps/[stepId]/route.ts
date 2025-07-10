import { db } from "@/lib/db";
import { StepModel } from "@/model/StepModel";
import { NextResponse } from "next/server";

type Params = {
  params: { historyId: string; stepId: string };
};

export async function GET(_req: Request, { params }: Params) {
  const { stepId, historyId } = await params;
  try {
    const result = await db.query(
      "SELECT id, text, history_id, pnj, background FROM steps WHERE id = ? AND history_id = ? ",

      [stepId, historyId]
    );
    const rows = result[0] as StepModel[];
    if (rows.length === 0) {
      return NextResponse.json({ error: "Etape non trouvée" }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("erreur MySql : ", error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 }
    );
  }
}
