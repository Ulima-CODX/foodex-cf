//FS Imports
import {
  db,
  FS_Collection,
  FS_Document,
  FS_DocumentData
} from "@/plugins/firebase";

//Data Import
import { AdminData } from "./data";

//Document Class
export class AdminDocument {
  //Properties
  public readonly ref: FS_Document;
  public readonly id: string;
  //Constructor
  public constructor(id: string) {
    this.id = id;
    this.ref = AdminCollection.ref.doc(id);
  }
  //Read Method
  public read = (): Promise<AdminData> =>
    this.ref.get().then(async (res: FS_DocumentData) => <AdminData>res.data());
  public exists = (): Promise<boolean> =>
    this.ref.get().then(async (res: FS_DocumentData) => res.exists);
}

//Collectio Class
export abstract class AdminCollection {
  //Properties
  public static readonly ref: FS_Collection = db.collection("admins");
  public static readonly id: string = AdminCollection.ref.id;
}
