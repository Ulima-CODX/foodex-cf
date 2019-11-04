//FS Imports
import {
  db,
  FS_Collection,
  FS_Document,
  FS_DocumentData
} from "@/plugins/firebase";

//Data Import
import { CountryData } from "./data";

//Document Class
export class CountryDocument {
  //Properties
  public readonly ref: FS_Document;
  public readonly id: string;
  //Constructor
  public constructor(id: string) {
    this.id = id;
    this.ref = CountryCollection.ref.doc(id);
  }
  //Read methods
  public read = (): Promise<CountryData> =>
    this.ref.get().then((res: FS_DocumentData) => {
      const temp: CountryData = <CountryData>res.data();
      const countrydata: CountryData = {
        ...temp,
        flag_url: `https://www.countryflags.io/${temp.iso}/flat/32.png`
      };
      return countrydata;
    });
  //Update methods
  public setCode = async (code: number) => this.ref.update({ code });
  public setIso = async (iso: string) => this.ref.update({ iso });
  public setName = async (name: string) => this.ref.update({ name });
  //Delete method
  public delete = async (): Promise<void> => this.ref.delete();
}

//Collection Class
export abstract class CountryCollection {
  //Properties
  public static readonly ref: FS_Collection = db.collection("countries");
  public static readonly id: string = CountryCollection.ref.id;
  //Create method
  public static create = async (
    code: number,
    iso: string,
    name: string
  ): Promise<CountryDocument> => {
    const countrydata: CountryData = {
      code,
      iso,
      name
    };
    return CountryCollection.ref
      .add(countrydata)
      .then(res => new CountryDocument(res.id));
  };
}
