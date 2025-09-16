import { dbUser } from "@/model/DbUserModel";
import { getOneUser } from "@/lib/getUser";
import { getInventoryByHistory } from "@/lib/getInventory";
import { Inventory } from "@/model/InventoryModel";
import { postInventoryByHistory } from "@/lib/postInventory";
import { deleteInventory } from "@/lib/deleteInventory";
import { getHistories } from "@/lib/getHistories";

export async function fetchInventoryForHistory(
  email: string,
  historyId: number
): Promise<Inventory[]> {
  return getInventoryByHistory(email, historyId);
}

export async function getUser(email: string): Promise<dbUser> {
  return getOneUser(email);
}

export async function addInventory(
  email: string,
  historyId: number,
  objectId: number
) {
  return postInventoryByHistory(email, historyId, objectId);
}

export async function deleteInventories(
  email: string,
  historyId: number,
  objectIds: number[]
) {
  return deleteInventory(email, historyId, objectIds);
}

export async function getAllHistories() {
  return getHistories();
}
