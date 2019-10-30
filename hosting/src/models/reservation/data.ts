//FS Imports
import { FS_Document, Timestamp } from "@/plugins/firebase";

//Data Type recieved from Firestore
export type ReservationFS_Data = {
  status: string;
  establishment: FS_Document;
  client: FS_Document;
  attendees: number;
  comment: string;
  orders: FS_Document[];
  time: Timestamp;
};

//Data Type used as output
export type ReservationData = {
  status: string;
  establishment_id: string;
  client_id: string;
  attendees: number;
  comment: string;
  order_ids: string[];
  time: Date;
};
