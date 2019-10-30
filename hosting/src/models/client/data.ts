//FS Imports
import { FS_Document } from "@/plugins/firebase";

//Data Type recieved from Firestore
export type ClientFS_Data = {
  favorites: {
    dishes: FS_Document[];
    establishments: FS_Document[];
  };
  reservations: FS_Document[];
  standalone_orders: FS_Document[];
};

//Data Type used as output
export type ClientData = {
  favorites: {
    dish_ids: string[];
    establishment_ids: string[];
  };
  reservation_ids: string[];
  standalone_order_ids: string[];
};
