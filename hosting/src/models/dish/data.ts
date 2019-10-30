//FS Imports
import { FS_Document } from "@/plugins/firebase";

//Data Type recieved from Firestore
export type DishFS_Data = {
  menu?: FS_Document;
  name: string;
  description: string;
  price: number;
  available: boolean;
  ingredients: string[];
};

//Data Type used as output
export type DishData = {
  menu_id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  ingredients: string[];
};
