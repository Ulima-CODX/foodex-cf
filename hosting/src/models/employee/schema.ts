//FS Imports
import {
  db,
  FS_Collection,
  FS_Document,
  FS_DocumentData,
  FS_Query
} from "@/plugins/firebase";

//Schema Imports
import { EstablishmentDocument } from "../establishment/schema";

//Data Imports
import { EmployeeData, EmployeeRoles, EmployeeProfile } from "./data";
import { EstablishmentData } from "../establishment/data";
import { UserData } from "../user/data";
import { UserDocument } from "../user/schema";

//Document Class
export class EmployeeDocument {
  //Properties
  public readonly ref: FS_Document;
  public readonly id: string;
  //Constructor
  public constructor(id: string) {
    this.id = id;
    this.ref = EmployeeCollection.ref.doc(id);
  }
  //Read methods
  public read = (): Promise<EmployeeData> =>
    this.ref
      .get()
      .then(async (res: FS_DocumentData) => <EmployeeData>res.data());
  public getRoles = (): Promise<EmployeeRoles> =>
    this.ref.get().then(async (res: FS_DocumentData) => {
      let roles: EmployeeRoles = {
        isManager: false,
        isOrderHandler: false,
        isReceptionist: false
      };
      const temp: EmployeeData = <EmployeeData>res.data();
      if (!temp.establishment_id) return roles;
      const establishmentData: EstablishmentData = await new EstablishmentDocument(
        temp.establishment_id
      ).read();
      roles.isManager = establishmentData.employees.manager_ids.includes(
        this.id
      );
      roles.isOrderHandler = establishmentData.employees.order_handler_ids.includes(
        this.id
      );
      roles.isReceptionist = establishmentData.employees.receptionist_ids.includes(
        this.id
      );
      return roles;
    });
  //Update methods
  public setEstablishment = async (
    establishment: EstablishmentDocument
  ): Promise<void> => this.ref.update({ establishment_id: establishment.id });
  public unsetEstablishment = async (): Promise<void> =>
    this.ref.update({ establishment: null });
  //Delete method
  public delete = async (): Promise<void> => this.ref.delete();
}

//Collection Class
export abstract class EmployeeCollection {
  //Properties
  public static readonly ref: FS_Collection = db.collection("employees");
  public static readonly id: string = EmployeeCollection.ref.id;
  //Create method
  public static create = async (id: string): Promise<EmployeeDocument> => {
    const employee: EmployeeDocument = new EmployeeDocument(id);
    const employeeData: EmployeeData = { establishment_id: undefined };
    return employee.ref.set(employeeData).then(() => employee);
  };
  //Read method
  public static read = async (
    establishment_name: string
  ): Promise<{ id: string; data: EmployeeProfile }[]> => {
    let ref: FS_Collection = EmployeeCollection.ref;
    return ref.get().then(group => {
      let employeeList: { id: string; data: EmployeeProfile }[] = [];
      group.forEach(async res => {
        const employeeData: EmployeeData = <EmployeeData>res.data();
        let establishment_name = "";
        if (employeeData.establishment_id) {
          const establishmentData: EstablishmentData = await new EstablishmentDocument(
            employeeData.establishment_id
          ).read();
          establishment_name = establishmentData.name;
        }
        const userData: UserData = await new UserDocument(res.id).read();
        employeeList.push({
          id: res.id,
          data: {
            establishment_name,
            first_name: userData.first_name,
            last_name: userData.last_name
          }
        });
      });
      return employeeList;
    });
  };
}
