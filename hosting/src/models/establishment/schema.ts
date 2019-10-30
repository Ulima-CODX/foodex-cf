//FS Imports
import {
  db,
  FS_Collection,
  FS_Document,
  FS_DocumentData,
  FieldValue
} from "@/plugins/firebase";

//Schema Imports
import { CountryDocument } from "../country/schema";
import { MenuDocument, MenuCollection } from "../menu/schema";
import { EmployeeDocument } from "../employee/schema";
import { OrderDocument } from "../order/schema";
import { ReservationDocument } from "../reservation/schema";

//Data Imports
import { EmployeeData, EmployeeRoles } from "../employee/data";
import { EstablishmentData, EstablishmentFS_Data } from "./data";

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
    this.ref.get().then(async (res: FS_DocumentData) => {
      const temp: EstablishmentFS_Data = <EstablishmentFS_Data>res.data();
      const establishmentData: EstablishmentData = {
        name: temp.name,
        description: temp.description,
        phone: temp.phone,
        address: temp.address,
        country_id: temp.country.id,
        menu_id: temp.menu ? temp.menu.id : "",
        employees: {
          manager_ids: temp.employees.managers
            ? temp.employees.managers.map(manager => manager.id)
            : [],
          order_handler_ids: temp.employees.order_handlers
            ? temp.employees.order_handlers.map(
                order_handler => order_handler.id
              )
            : [],
          receptionist_ids: temp.employees.receptionists
            ? temp.employees.receptionists.map(
                receptionists => receptionists.id
              )
            : []
        },
        working_hours: temp.working_hours,
        order_ids: temp.orders.map(order => order.id),
        reservation_limit: temp.reservation_limit,
        reservation_ids: temp.reservations.map(reservation => reservation.id)
      };
      return establishmentData;
    });
  //Update methods
  public setName = async (name: string): Promise<void> =>
    this.ref.update({ name });
  public setDescription = async (description: string): Promise<void> =>
    this.ref.update({ description });
  public setPhone = async (phone: string): Promise<void> =>
    this.ref.update({ phone });
  public setCountry = async (country: CountryDocument): Promise<void> =>
    this.ref.update({ country: country.ref });
  public setMenu = async (menu: MenuDocument): Promise<void> =>
    this.ref.update({ menu: menu.ref });
  public setReservationLimit = async (
    reservation_limit: number
  ): Promise<void> => this.ref.update({ reservation_limit });
  public assignEmployee = async (
    employee: EmployeeDocument,
    employee_group: "managers" | "order_handlers" | "receptionists"
  ): Promise<void> => {
    const employeeData: EmployeeData = await employee.read();
    if (!employeeData.establishment_id) employee.setEstablishment(this);
    if (employeeData.establishment_id != this.id) return;
    return this.ref.update({
      employees: { [employee_group]: FieldValue.arrayUnion(employee.ref) }
    });
  };
  public dismissEmployee = async (
    employee: EmployeeDocument,
    employee_group: "managers" | "order_handlers" | "receptionists"
  ): Promise<void> => {
    const employeeData: EmployeeData = await employee.read();
    if (employeeData.establishment_id != this.id) return;
    return this.ref
      .update({
        employees: { [employee_group]: FieldValue.arrayRemove(employee.ref) }
      })
      .then(async () => {
        const roles: EmployeeRoles = await employee.getRoles();
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
    this.ref.update({ orders: FieldValue.arrayUnion(order.ref) });
  public removeOrder = (order: OrderDocument): Promise<void> =>
    this.ref.update({ orders: FieldValue.arrayRemove(order.ref) });
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
    const establishmentData: EstablishmentFS_Data = {
      name,
      description,
      phone,
      address,
      country: country.ref,
      employees: {
        managers: [],
        order_handlers: [],
        receptionists: []
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
      orders: [],
      reservation_limit: 0,
      reservations: []
    };
    const establishment: EstablishmentDocument = await EstablishmentCollection.ref
      .add(establishmentData)
      .then(res => new EstablishmentDocument(res.id));
    const menu: MenuDocument = await MenuCollection.create(establishment);
    return establishment.setMenu(menu).then(() => establishment);
  };
}
