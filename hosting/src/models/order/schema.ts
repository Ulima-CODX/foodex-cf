//FS Imports
import {
  db,
  FS_Collection,
  FS_Document,
  FS_DocumentData,
  Timestamp,
  FieldValue
} from "@/plugins/firebase";

//Schema Imports
import { ClientDocument } from "../client/schema";
import { DishDocument } from "../dish/schema";

//Data Import
import { OrderData } from "./data";
import { DishData } from "../dish/data";

//Document Class
export class OrderDocument {
  //Properties
  public readonly ref: FS_Document;
  public readonly id: string;
  //Constructor
  public constructor(id: string) {
    this.id = id;
    this.ref = OrderCollection.ref.doc(id);
  }
  //Read methods
  public read = (): Promise<OrderData> =>
    this.ref.get().then(async (res: FS_DocumentData) => <OrderData>res.data());
  //Update methods
  public setStatus = async (status: string): Promise<void> =>
    this.ref.update({ status });
  public setComment = async (comment: string): Promise<void> =>
    this.ref.update({ comment });
  public setDiscount = async (discount: number): Promise<void> => {
    const orderData: OrderData = await this.read();
    const total_to_pay = orderData.total - discount;
    return this.ref.update({
      discount,
      total_to_pay: total_to_pay > 0 ? total_to_pay : 0
    });
  };
  public addDish = async (
    dish: DishDocument,
    quantity: number
  ): Promise<void> => {
    const dishData: DishData = await dish.read();
    if (!dishData.available) return;
    const orderData: OrderData = await this.read();
    const total = orderData.total + dishData.price;
    const total_to_pay = total - orderData.discount;
    if (orderData.status == "pending") {
      return this.ref.set(
        {
          dish_ids: { [dish.id]: quantity },
          total,
          total_to_pay: total_to_pay > 0 ? total_to_pay : 0
        },
        { merge: true }
      );
    }
  };
  public removeDish = async (dish: DishDocument): Promise<void> => {
    const dishData: DishData = await dish.read();
    if (!dishData.available) return;
    const orderData: OrderData = await this.read();
    const total = orderData.total - dishData.price;
    const total_to_pay = total - orderData.discount;
    if (orderData.status == "pending") {
      return this.ref.set(
        {
          dish_ids: { [dish.id]: FieldValue.delete() },
          total,
          total_to_pay: total_to_pay > 0 ? total_to_pay : 0
        },
        { merge: true }
      );
    }
  };
  //Delete method
  public delete = async (): Promise<void> => this.ref.delete();
}

//Collection Class
export abstract class OrderCollection {
  //Properties
  public static readonly ref: FS_Collection = db.collection("orders");
  public static readonly id: string = OrderCollection.ref.id;
  //Create method
  public static create = async (
    client: ClientDocument
  ): Promise<OrderDocument> => {
    const orderData: OrderData = {
      status: "pending",
      client_id: client.id,
      dish_ids: {},
      comment: "",
      total: 0,
      discount: 0,
      total_to_pay: 0,
      time: Timestamp.now()
    };
    return OrderCollection.ref
      .add(orderData)
      .then(res => new OrderDocument(res.id));
  };
}
