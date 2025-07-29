import { infoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { Inventory } from "@/model/InventoryModel";


export async function postInventoryByHistory(
    email: string,
    historyId: number,
    objectId: number
): Promise<Inventory> {
    const res = await fetch(apiRoutes.INVENTORY(email, historyId), {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ objectId }),
    });

    if (res.status === 404) {
        throw new Error(infoMessages.notFound || "Information non trouvée");
    }

    if (!res.ok) {
        throw new Error(infoMessages.error);
    }

    return res.json();
}