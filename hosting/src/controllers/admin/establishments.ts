//Schema Imports
import { EstablishmentCollection } from "@/models/establishment/schema";

//create: create establishment in firestore
export const create = EstablishmentCollection.create;

//read: read establishment data from collection
export const read = EstablishmentCollection.read;
