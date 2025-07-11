import { Inventaire } from "./InventoryModel";
import { Progress } from "./ProgressModel";


export type User = {
    id: number;
    pseudo: string;
    avatar: string;
    email: string;
    progress: Progress;
    inventaire: Inventaire;
};