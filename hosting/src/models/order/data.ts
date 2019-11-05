//FS Imports
import { Timestamp } from "@/plugins/firebase";

//Data Type
export type OrderData = {
  status: string;
  client_id: string;
  dish_ids: Record<string, number>;
  comment: string;
  total: number;
  discount: number;
  total_to_pay: number;
  timestamp: Timestamp;
};
