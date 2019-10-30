//FS Imports
import { FS_Document } from "@/plugins/firebase";

//Data Type recieved from Firestore
export type UserFS_Data = {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  country: FS_Document;
};

//Data Type used as output
export type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  country_id: string;
};

export type UserRoles = {
  isAdmin: boolean;
  isManager: boolean;
  isOrderHandler: boolean;
  isReceptionist: boolean;
  isClient: boolean;
};
