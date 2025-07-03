import { Inventaire } from "./InventoryModel";
import { Progress } from "./ProgressModel";


export type User = {
    pseudo: string;
    avatar: string;
    email: string;
    progress: Progress;
    inventaire: Inventaire;
};