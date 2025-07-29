import { dbUser } from "@/model/dbUserModel";
import { getOneUser } from "@/lib/getUser";
import { getInventoryByHistory } from "@/lib/getInventory";
import { Inventory } from "@/model/InventoryModel";
import { postInventoryByHistory } from "@/lib/postInventory";

export async function fetchInventoryForHistory(email: string, historyId: number): Promise<Inventory[]> {
  return getInventoryByHistory(email, historyId);
}

export async function getUser(email: string): Promise<dbUser>{
  return getOneUser(email)
}

export async function addInventory(email: string, historyId: number, objectId: number) {
  return postInventoryByHistory(email, historyId, objectId)
}