export interface Inventory {
  id: number;
  is_used: number;
  user_id: number;
  object_id: number;
  history_id: number;
  name?: string;
  description?: string;
  image?: string;
}
