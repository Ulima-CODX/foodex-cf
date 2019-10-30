//FS Imports
import { FS_Document } from "@/plugins/firebase";

//Data Type recieved from Firestore
export type EstablishmentFS_Data = {
  name: string;
  description: string;
  phone: number;
  address: string;
  country: FS_Document;
  menu?: FS_Document;
  employees: {
    managers: FS_Document[];
    order_handlers: FS_Document[];
    receptionists: FS_Document[];
  };
  working_hours: {
    monday: { open: string; close: string };
    tuesday: { open: string; close: string };
    wednesday: { open: string; close: string };
    thursday: { open: string; close: string };
    friday: { open: string; close: string };
    saturday: { open: string; close: string };
    sunday: { open: string; close: string };
  };
  orders: FS_Document[];
  reservation_limit: number;
  reservations: FS_Document[];
};

//Data Type used as output
export type EstablishmentData = {
  name: string;
  description: string;
  phone: number;
  address: string;
  country_id: string;
  menu_id: string;
  employees: {
    manager_ids: string[];
    order_handler_ids: string[];
    receptionist_ids: string[];
  };
  working_hours: {
    monday: { open: string; close: string };
    tuesday: { open: string; close: string };
    wednesday: { open: string; close: string };
    thursday: { open: string; close: string };
    friday: { open: string; close: string };
    saturday: { open: string; close: string };
    sunday: { open: string; close: string };
  };
  order_ids: string[];
  reservation_limit: number;
  reservation_ids: string[];
};
