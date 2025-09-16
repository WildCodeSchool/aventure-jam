import { apiRoutes } from "@/data/ROUTES";
import { ProgressModel } from "@/model/ProgressModel";

export async function getProgress(
  email: string,
  historyId: number
): Promise<ProgressModel | null> {
  try {
    const response = await fetch(apiRoutes.PROGRESS(email, historyId));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération de la progression :", error);
    return null;
  }
}

export async function createProgress(
  email: string,
  historyId: number,
  stepId: number,
  objectId?: number
): Promise<boolean> {
  try {
    const response = await fetch(apiRoutes.PROGRESS(email, historyId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        step_id: stepId,
        object_id: objectId || null,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Erreur lors de la création de la progression :", error);
    return false;
  }
}

export async function updateProgress(
  email: string,
  historyId: number,
  stepId: number,
  objectId?: number
): Promise<boolean> {
  try {
    const response = await fetch(apiRoutes.PROGRESS(email, historyId), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        step_id: stepId,
        object_id: objectId || null,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la progression :", error);
    return false;
  }
}

export async function deleteProgress(
  email: string,
  historyId: number
): Promise<boolean> {
  try {
    const response = await fetch(apiRoutes.PROGRESS(email, historyId), {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Erreur lors de la suppression de la progression :", error);
    return false;
  }
}
