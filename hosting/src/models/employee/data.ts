//FS Imports
import { FS_Document } from "@/plugins/firebase";

//Data Type recieved from Firestore
export type EmployeeDataFS_Data = {
  establishment?: FS_Document;
};

//Data Types used as output
export type EmployeeData = {
  establishment_id?: string;
};
export type EmployeeRoles = {
  isManager: boolean;
  isOrderHandler: boolean;
  isReceptionist: boolean;
};
