import { db } from "@/lib/db";
import { StepModel } from "@/model/StepModel";
import { NextResponse } from "next/server";

type Params = {
  params: { stepId: string; choiceId: string };
};

export async function GET(_req: Request, { params }: Params) {
  const { stepId } = await params;
  try {
    const result = await db.query(
      "SELECT id, text, step_id, link_to_step_id FROM choice WHERE step_id = ?",
      [stepId]
    );
    const rows = result[0] as StepModel[];
    if (rows.length === 0) {
      return NextResponse.json({ error: "Etape non trouvée" }, { status: 404 });
    }
    return NextResponse.json(rows);
  } catch (error) {
    console.error("erreur MySql : ", error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 }
    );
  }
}
