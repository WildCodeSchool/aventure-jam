export interface Inventory {
  id: number;
  is_used: boolean;
  user_id: number;
  object_id: number;
  history_id: number;
  name?: string;
  description?: string;
  image?: string;
}
