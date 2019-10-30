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
import { ClientData, ClientFS_Data } from "./data";
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
    this.ref.get().then(async (res: FS_DocumentData) => {
      const temp: ClientFS_Data = <ClientFS_Data>res.data();
      const clientData: ClientData = {
        favorites: {
          dish_ids: temp.favorites.dishes.map(dish => dish.id),
          establishment_ids: temp.favorites.establishments.map(
            establishment => establishment.id
          )
        },
        reservation_ids: temp.reservations.map(reservation => reservation.id),
        standalone_order_ids: temp.standalone_orders.map(order => order.id)
      };
      return clientData;
    });
  public exists = (): Promise<boolean> =>
    this.ref.get().then(async (res: FS_DocumentData) => res.exists);
  //Update methods
  public addFavoriteDish = async (dish: DishDocument): Promise<void> =>
    this.ref.update({ favorites: { dishes: FieldValue.arrayUnion(dish.ref) } });
  public removeFavoriteDish = async (dish: DishDocument): Promise<void> =>
    this.ref.update({
      favorites: { dishes: FieldValue.arrayRemove(dish.ref) }
    });
  public addFavoriteEstablishment = async (
    establishment: EstablishmentDocument
  ): Promise<void> =>
    this.ref.update({
      favorites: { establishments: FieldValue.arrayUnion(establishment.ref) }
    });
  public removeFavoriteEstablishment = async (
    establishment: EstablishmentDocument
  ): Promise<void> =>
    this.ref.update({
      favorites: { establishments: FieldValue.arrayRemove(establishment.ref) }
    });
  public addOrder = async (order: OrderDocument): Promise<void> =>
    this.ref.update({ standalone_orders: FieldValue.arrayUnion(order.ref) });
  public removeOrder = async (order: OrderDocument): Promise<void> =>
    this.ref.update({ standalone_orders: FieldValue.arrayRemove(order.ref) });
  public addReservation = async (
    reservation: ReservationDocument
  ): Promise<void> =>
    this.ref.update({ reservations: FieldValue.arrayUnion(reservation.ref) });
  public removeReservation = async (
    reservation: ReservationDocument
  ): Promise<void> =>
    this.ref.update({ reservations: FieldValue.arrayRemove(reservation.ref) });
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
    const clientData: ClientFS_Data = {
      favorites: { dishes: [], establishments: [] },
      reservations: [],
      standalone_orders: []
    };
    return client.ref.set(clientData).then(() => client);
  };
}
