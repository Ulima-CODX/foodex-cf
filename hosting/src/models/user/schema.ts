//FS Imports
import {
  db,
  FS_Collection,
  FS_Document,
  FS_DocumentData
} from "@/plugins/firebase";

//Schema Import
import { CountryDocument } from "../country/schema";

//Data Imports
import { UserData, UserFS_Data } from "./data";

//Document Class
export class UserDocument {
  //Properties
  public readonly ref: FS_Document;
  public readonly id: string;
  //Constructor
  public constructor(id: string) {
    this.id = id;
    this.ref = UserCollection.ref.doc(id);
  }
  //Read methods
  public read = (): Promise<UserData> =>
    this.ref.get().then(async (res: FS_DocumentData) => {
      const temp = <UserFS_Data>res.data();
      const userData: UserData = {
        first_name: temp.first_name,
        last_name: temp.last_name,
        email: temp.email,
        phone: temp.phone,
        country_id: temp.country.id
      };
      return userData;
    });

  //Update methods
  public setFirstName = async (first_name: number): Promise<void> =>
    this.ref.update({ first_name });
  public setLastName = async (last_name: string): Promise<void> =>
    this.ref.update({ last_name });
  public setEmail = async (email: string): Promise<void> =>
    this.ref.update({ email });
  public setPhone = async (phone: string): Promise<void> =>
    this.ref.update({ phone });
  public setCountry = async (country: CountryDocument): Promise<void> =>
    this.ref.update({ country: country.ref });
  //Delete method
  public delete = async (): Promise<void> => this.ref.delete();
}

//Collection Class
export abstract class UserCollection {
  //Properties
  public static readonly ref: FS_Collection = db.collection("users");
  public static readonly id: string = UserCollection.ref.id;
  //Create method
  public static create = async (
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: number,
    country: CountryDocument
  ): Promise<UserDocument> => {
    const user: UserDocument = new UserDocument(id);
    const userData: UserFS_Data = {
      first_name,
      last_name,
      email,
      phone,
      country: country.ref
    };
    return user.ref.set(userData).then(() => user);
  };
}
