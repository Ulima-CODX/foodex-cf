//FS Imports
import { FS_Document, Timestamp } from "@/plugins/firebase";

//Data Type recieved from Firestore
export type OrderFS_Data = {
  status: string;
  client: FS_Document;
  dishes: {
    dish: FS_Document;
    quantity: number;
  }[];
  comment: string;
  total: number;
  discount: number;
  total_to_pay: number;
  time: Timestamp;
};

//Data Type used as output
export type OrderData = {
  status: string;
  client_id: string;
  dishes: {
    dish_id: string;
    quantity: number;
  }[];
  comment: string;
  total: number;
  discount: number;
  total_to_pay: number;
  time: Date;
};
