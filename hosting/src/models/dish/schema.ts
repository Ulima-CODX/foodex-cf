//FS Imports
import {
  db,
  FieldValue,
  FS_Collection,
  FS_Document,
  FS_DocumentData
} from "@/plugins/firebase";

//Schema Imports
import { MenuDocument } from "../menu/schema";

//Data Imports
import { DishData } from "./data";

//Document Class
export class DishDocument {
  //Properties
  public readonly ref: FS_Document;
  public readonly id: string;
  //Constructor
  public constructor(id: string) {
    this.id = id;
    this.ref = DishCollection.ref.doc(id);
  }
  //Read methods
  public read = (): Promise<DishData> =>
    this.ref.get().then(async (res: FS_DocumentData) => <DishData>res.data());
  //Update methods
  public setMenu = async (menu: MenuDocument): Promise<void> =>
    this.ref.update({ menu_id: menu.id });
  public setName = async (name: string): Promise<void> =>
    this.ref.update({ name });
  public setDescription = async (description: string): Promise<void> =>
    this.ref.update({ description });
  public setPrice = async (price: number): Promise<void> =>
    this.ref.update({ price });
  public setAvailable = async (available: boolean): Promise<void> =>
    this.ref.update({ available });
  public addIngredient = async (ingredient: string): Promise<void> =>
    this.ref.update({ ingredients: FieldValue.arrayUnion(ingredient) });
  public removeIngredient = async (ingredient: string): Promise<void> =>
    this.ref.update({ ingredients: FieldValue.arrayRemove(ingredient) });
  //Delete method
  public delete = async (): Promise<void> => this.ref.delete();
}

//Collection Class
export abstract class DishCollection {
  //Properties
  public static readonly ref: FS_Collection = db.collection("dishes");
  public static readonly id: string = DishCollection.ref.id;
  //Create method
  public static create = async (
    name: string,
    description: string,
    price: number
  ): Promise<DishDocument> => {
    const dishData: DishData = {
      name,
      description,
      price,
      available: false,
      ingredients: []
    };
    return DishCollection.ref
      .add(dishData)
      .then(res => new DishDocument(res.id));
  };
}
