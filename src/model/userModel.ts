import { Inventory } from "./InventoryModel";
import { ProgressModel } from "./ProgressModel";

export type User = {
  id: number;
  pseudo: string;
  avatar: string;
  email: string;
  progress: ProgressModel;
  inventory: Inventory[];
};
