import { infoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { dbUser } from "@/model/DbUserModel";

export async function getOneUser(email: string): Promise<dbUser> {
  const res = await fetch(apiRoutes.USER_EMAIL(email), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    throw new Error(infoMessages.notFound || "Information non trouvée");
  }

  if (!res.ok) {
    throw new Error(infoMessages.error);
  }

  return res.json();
}
