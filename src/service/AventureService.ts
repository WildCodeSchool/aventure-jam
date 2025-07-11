import { dbUser } from "@/model/dbUserModel";
import { getOneUser } from "@/lib/getUser";
import { getInventoryByHistory } from "@/lib/getInventory";
import { Inventaire } from "@/model/InventoryModel";

export async function fetchInventoryForHistory(email: string, historyId: number): Promise<Inventaire[]> {
  return getInventoryByHistory(email, historyId);
}

export async function getUser(email: string): Promise<dbUser>{
  return getOneUser(email)
}