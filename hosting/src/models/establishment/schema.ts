//FS Imports
import {
  db,
  FS_Collection,
  FS_Document,
  FS_DocumentData,
  FieldValue,
  FS_Query
} from "@/plugins/firebase";

//Schema Imports
import { CountryDocument } from "../country/schema";
import { MenuDocument, MenuCollection } from "../menu/schema";
import { EmployeeDocument } from "../employee/schema";
import { OrderDocument } from "../order/schema";
import { ReservationDocument } from "../reservation/schema";

//Data Imports
import { EmployeeData, EmployeeRoles } from "../employee/data";
import { EstablishmentData } from "./data";

//Document Class
export class EstablishmentDocument {
  //Properties
  public readonly ref: FS_Document;
  public readonly id: string;
  //Constructor
  public constructor(id: string) {
    this.id = id;
    this.ref = EstablishmentCollection.ref.doc(id);
  }
  //Read methods
  public read = (): Promise<EstablishmentData> =>
    this.ref
      .get()
      .then(async (res: FS_DocumentData) => <EstablishmentData>res.data());
  //Update methods
  public setName = async (name: string): Promise<void> =>
    this.ref.update({ name });
  public setDescription = async (description: string): Promise<void> =>
    this.ref.update({ description });
  public setAddress = async (address:string): Promise<void> => 
    this.ref.update({ address });
  public setPhone = async (phone: string): Promise<void> =>
    this.ref.update({ phone });
  public setCountry = async (country: CountryDocument): Promise<void> =>
    this.ref.update({ country_id: country.id });
  public setMenu = async (menu: MenuDocument): Promise<void> =>
    this.ref.update({ menu_id: menu.id });
  public setReservationLimit = async (
    reservation_limit: number
  ): Promise<void> => this.ref.update({ reservation_limit });
  public assignEmployee = async (
    employee: EmployeeDocument,
    employee_type: "manager" | "order_handler" | "receptionist"
  ): Promise<void> => {
    const employeeData: EmployeeData = await employee.read();
    if (!employeeData.establishment_id) employee.setEstablishment(this);
    if (employeeData.establishment_id != this.id) return;
    return this.ref.update({
      employees: {
        [`${employee_type}_ids`]: FieldValue.arrayUnion(employee.id)
      }
    });
  };
  public dismissEmployee = async (
    employee: EmployeeDocument,
    employee_type: "manager" | "order_handler" | "receptionist"
  ): Promise<void> => {
    const employeeData: EmployeeData = await employee.read();
    if (employeeData.establishment_id != this.id) return;
    return this.ref
      .update({
        employees: {
          [`${employee_type}_ids`]: FieldValue.arrayRemove(employee.id)
        }
      })
      .then(async () => {
        const roles: EmployeeRoles = (await employee.getEstablishmentRoles())
          .roles;
        const hasRoles: boolean = Object.values(roles).reduce(
          (acc, val) => acc && val
        );
        if (!hasRoles) employee.unsetEstablishment();
        return;
      });
  };
  public setWorkingHour = (
    day:
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday",
    open: string,
    close: string
  ): Promise<void> =>
    this.ref.set(
      { working_hours: { [day]: { open, close } } },
      { merge: true }
    );
  public addOrder = (order: OrderDocument): Promise<void> =>
    this.ref.update({ order_ids: FieldValue.arrayUnion(order.id) });
  public removeOrder = (order: OrderDocument): Promise<void> =>
    this.ref.update({ order_ids: FieldValue.arrayRemove(order.id) });
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
export abstract class EstablishmentCollection {
  //Properties
  public static readonly ref: FS_Collection = db.collection("establishments");
  public static readonly id: string = EstablishmentCollection.ref.id;
  //Create method
  public static create = async (
    name: string,
    description: string,
    phone: number,
    address: string,
    country: CountryDocument
  ): Promise<EstablishmentDocument> => {
    const establishmentData: EstablishmentData = {
      name,
      description,
      phone,
      address,
      country_id: country.id,
      employees: {
        manager_ids: [],
        order_handler_ids: [],
        receptionist_ids: []
      },
      working_hours: {
        monday: { open: "", close: "" },
        tuesday: { open: "", close: "" },
        wednesday: { open: "", close: "" },
        thursday: { open: "", close: "" },
        friday: { open: "", close: "" },
        saturday: { open: "", close: "" },
        sunday: { open: "", close: "" }
      },
      order_ids: [],
      reservation_limit: 0,
      reservation_ids: []
    };
    const establishment: EstablishmentDocument = await EstablishmentCollection.ref
      .add(establishmentData)
      .then(res => new EstablishmentDocument(res.id));
    const menu: MenuDocument = await MenuCollection.create(establishment);
    return establishment.setMenu(menu).then(() => establishment);
  };
  //Read method
  public static read = async (
    name?: string
  ): Promise<{ id: string; data: EstablishmentData }[]> => {
    let ref: FS_Collection | FS_Query = EstablishmentCollection.ref;
    if (name && name != "") ref = ref.where("name", "==", name);
    return ref.get().then(group => {
      let establishmentList: { id: string; data: EstablishmentData }[] = [];
      group.forEach(res => {
        establishmentList.push({
          id: res.id,
          data: <EstablishmentData>res.data()
        });
      });
      return establishmentList;
    });
  };
}
