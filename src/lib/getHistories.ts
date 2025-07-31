import { infoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function getHistories(){
    const res = await fetch(`${apiRoutes.HISTORIES}`, {
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