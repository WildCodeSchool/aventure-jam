import { infoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { Inventaire } from "@/model/InventoryModel";


export async function getInventoryByHistory(email: string, historyId: number): Promise<Inventaire[]> {
    const res = await fetch(`${apiRoutes.INVENTORY(email, historyId)}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (res.status === 404) {
        throw new Error(infoMessages.notFound || "Information non trouvée");
    }

    if (!res.ok) {
        throw new Error(infoMessages.error);
    }

    return res.json();
}