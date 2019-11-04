//FS Imports
import { Timestamp } from "@/plugins/firebase";

//Data Type
export type ReservationData = {
  status: string;
  establishment_id: string;
  client_id: string;
  attendees: number;
  comment: string;
  order_ids: string[];
  timestamp: Timestamp;
};
