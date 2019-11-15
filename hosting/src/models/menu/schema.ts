//FS Imports
import {
  db,
  FS_Collection,
  FS_Document,
  FS_DocumentData,
  FieldValue
} from "@/plugins/firebase";

//Schema Imports
import { EstablishmentDocument } from "../establishment/schema";
import { DishDocument } from "../dish/schema";

//Data Imports
import { MenuData } from "./data";

//Document Class
export class MenuDocument {
  //Properties
  public readonly ref: FS_Document;
  public readonly id: string;
  //Constructor
  public constructor(id: string) {
    this.id = id;
    this.ref = MenuCollection.ref.doc(id);
  }
  //Read methods
  public read = (): Promise<MenuData> =>
    this.ref.get().then(async (res: FS_DocumentData) => <MenuData>res.data());
  //Update methods
  public setEstablishment = async (
    establishment: EstablishmentDocument
  ): Promise<void> => this.ref.update({ establishment_id: establishment.id });
  public addDish = async (dish: DishDocument): Promise<void> =>
    this.ref
      .update({ dish_ids: FieldValue.arrayUnion(dish.id) })
      .then(() => dish.setMenu(this));
  public removeDish = async (dish: DishDocument): Promise<void> =>
    this.ref
      .update({ dish_ids: FieldValue.arrayRemove(dish.id) })
      .then(() => dish.delete());
  //Delete method
  public delete = (): Promise<void> => this.ref.delete();
}

//Collection Class
export abstract class MenuCollection {
  //Properties
  public static readonly ref: FS_Collection = db.collection("menus");
  public static readonly id: string = MenuCollection.ref.id;
  //Create method
  public static create = async (
    establishment: EstablishmentDocument
  ): Promise<MenuDocument> =>
    MenuCollection.ref
      .add({
        establishment_id: establishment.id,
        dish_ids: []
      })
      .then(res => new MenuDocument(res.id));
}
