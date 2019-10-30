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
import { EstablishmentDocument } from "../establishment/schema";
import { OrderDocument } from "../order/schema";

//Data Imports
import { ReservationData, ReservationFS_Data } from "./data";

//Document Class
export class ReservationDocument {
  //Properties
  public readonly ref: FS_Document;
  public readonly id: string;
  //Constructor
  public constructor(id: string) {
    this.id = id;
    this.ref = ReservationCollection.ref.doc(id);
  }
  //Read methods
  public read = (): Promise<ReservationData> =>
    this.ref.get().then(async (res: FS_DocumentData) => {
      const temp: ReservationFS_Data = <ReservationFS_Data>res.data();
      const reservationData: ReservationData = {
        status: temp.status,
        establishment_id: temp.establishment.id,
        client_id: temp.client.id,
        attendees: temp.attendees,
        comment: temp.comment,
        order_ids: temp.orders.map(order => order.id),
        time: temp.time.toDate()
      };
      return reservationData;
    });
  //Update methods
  public setStatus = (status: string): Promise<void> =>
    this.ref.update({ status });
  public setAttendees = (attendees: number): Promise<void> =>
    this.ref.update({ attendees });
  public setComment = (comment: string): Promise<void> =>
    this.ref.update({ comment });
  public addOrder = (order: OrderDocument): Promise<void> =>
    this.ref.update({ orders: FieldValue.arrayUnion(order.ref) });
  public removeOrder = (order: OrderDocument): Promise<void> =>
    this.ref.update({ orders: FieldValue.arrayRemove(order.ref) });
  //Delete method
  public delete = async (): Promise<void> => this.ref.delete();
}

//Collection Class
export abstract class ReservationCollection {
  //Properties
  public static readonly ref: FS_Collection = db.collection("reservations");
  public static readonly id: string = ReservationCollection.ref.id;
  //Create method
  public static create = async (
    establishment: EstablishmentDocument,
    client: ClientDocument,
    attendees: number
  ): Promise<ReservationDocument> => {
    const reservationData: ReservationFS_Data = {
      status: "pending",
      client: client.ref,
      establishment: establishment.ref,
      attendees,
      comment: "",
      orders: [],
      time: Timestamp.fromMillis(Date.now())
    };
    return ReservationCollection.ref
      .add(reservationData)
      .then(res => new ReservationDocument(res.id));
  };
}
