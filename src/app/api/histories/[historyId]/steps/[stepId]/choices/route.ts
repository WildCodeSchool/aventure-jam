import { db } from "@/lib/db";
import { ChoiceModel } from "@/model/ChoiceModel";
import { NextResponse } from "next/server";

type Params = {
  params: { stepId: string; historyId: string };
};

export async function GET(_req: Request, { params }: Params) {
  const { stepId } = await params;
  try {
    const result = await db.query(
      "SELECT id, text, step_id AS stepId, object_id AS objectId, link_to_step_id AS linkToStepId FROM choice WHERE step_id = ?",
      [stepId]
    );
    const choices = result[0] as ChoiceModel[];
    return NextResponse.json(choices);
  } catch (error) {
    console.error("erreur MySql : ", error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 }
    );
  }
}
