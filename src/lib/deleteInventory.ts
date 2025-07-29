import { infoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function deleteInventory(
    email: string,
    historyId: number,
    objectIds: number[]
): Promise<void> {
    const res = await fetch(apiRoutes.INVENTORY(email, historyId), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ objectIds }),
    });

    if (res.status === 404) {
        throw new Error(infoMessages.notFound || "Ressource non trouvée.");
    }

    if (!res.ok) {
        throw new Error(infoMessages.error || "Erreur lors de la suppression.");
    }
}