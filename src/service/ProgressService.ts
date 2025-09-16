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
