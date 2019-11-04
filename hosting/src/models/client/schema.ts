//FS Imports
import {
  db,
  FieldValue,
  FS_Collection,
  FS_Document,
  FS_DocumentData
} from "@/plugins/firebase";

//Schema Imports
import { OrderDocument } from "../order/schema";
import { ReservationDocument } from "../reservation/schema";

//Data Imports
import { ClientData } from "./data";
import { DishDocument } from "../dish/schema";
import { EstablishmentDocument } from "../establishment/schema";

//Document Class
export class ClientDocument {
  //Properties
  public readonly ref: FS_Document;
  public readonly id: string;
  //Constructor
  public constructor(id: string) {
    this.id = id;
    this.ref = ClientCollection.ref.doc(id);
  }
  //Read methods
  public read = (): Promise<ClientData> =>
    this.ref.get().then(async (res: FS_DocumentData) => <ClientData>res.data());
  public exists = (): Promise<boolean> =>
    this.ref.get().then(async (res: FS_DocumentData) => res.exists);
  //Update methods
  public addFavoriteDish = async (dish: DishDocument): Promise<void> =>
    this.ref.update({
      favorites: { dish_ids: FieldValue.arrayUnion(dish.id) }
    });
  public removeFavoriteDish = async (dish: DishDocument): Promise<void> =>
    this.ref.update({
      favorites: { dish_ids: FieldValue.arrayRemove(dish.id) }
    });
  public addFavoriteEstablishment = async (
    establishment: EstablishmentDocument
  ): Promise<void> =>
    this.ref.update({
      favorites: { establishment_ids: FieldValue.arrayUnion(establishment.id) }
    });
  public removeFavoriteEstablishment = async (
    establishment: EstablishmentDocument
  ): Promise<void> =>
    this.ref.update({
      favorites: { establishment_ids: FieldValue.arrayRemove(establishment.id) }
    });
  public addOrder = async (order: OrderDocument): Promise<void> =>
    this.ref.update({ standalone_order_ids: FieldValue.arrayUnion(order.id) });
  public removeOrder = async (order: OrderDocument): Promise<void> =>
    this.ref.update({ standalone_order_ids: FieldValue.arrayRemove(order.id) });
  public addReservation = async (
    reservation: ReservationDocument
  ): Promise<void> =>
    this.ref.update({ reservation_ids: FieldValue.arrayUnion(reservation.id) });
  public removeReservation = async (
    reservation: ReservationDocument
  ): Promise<void> =>
    this.ref.update({
      reservation_ids: FieldValue.arrayRemove(reservation.id)
    });
  //Delete method
  public delete = async (): Promise<void> => this.ref.delete();
}

//Collection Class
export abstract class ClientCollection {
  //Properties
  public static readonly ref: FS_Collection = db.collection("clients");
  public static readonly id: string = ClientCollection.ref.id;
  //Create method
  public static create = async (id: string): Promise<ClientDocument> => {
    const client: ClientDocument = new ClientDocument(id);
    const clientData: ClientData = {
      favorites: { dish_ids: [], establishment_ids: [] },
      reservation_ids: [],
      standalone_order_ids: []
    };
    return client.ref.set(clientData).then(() => client);
  };
}
