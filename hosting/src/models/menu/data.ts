//FS Imports
import { FS_Document } from "@/plugins/firebase";

//Data Type recieved from Firestore
export type MenuFS_Data = {
  establishment: FS_Document;
  dishes: FS_Document[];
};

//Data Type used as output
export type MenuData = {
  establishment_id: string;
  dish_ids: string[];
};
