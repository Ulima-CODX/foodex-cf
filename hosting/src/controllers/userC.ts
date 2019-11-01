//Plugin Imports
import { auth } from "@/plugins/firebase";
import Router from "@/plugins/router";
import Store from "@/plugins/vuex";

//Schema Imports
import { EmployeeDocument } from "@/models/employee/schema";
import { AdminDocument } from "@/models/admin/schema";
import { ClientDocument } from "@/models/client/schema";
import { CountryDocument } from "@/models/country/schema";
import { UserDocument } from "@/models/user/schema";

//Data Imports
import { EmployeeRoles } from "@/models/employee/data";
import { UserRoles, UserData } from "@/models/user/data";
import { CountryData } from "@/models/country/data";

export type ProfileData = null | {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  country: {
    code: number;
    iso: string;
    name: string;
    flag_url: string;
  };
};

export type NavigationLink = {
  label: string;
  url: string;
};

//Controller
export abstract class UserController {
  //Navigation
  public static getLinks = async (): Promise<NavigationLink[]> => {
    let links: NavigationLink[] = [];
    const userRoles: UserRoles = Store.state.user.roles;
    if (userRoles.isAdmin) links.push({ label: "Admin", url: "" });
    if (userRoles.isManager) links.push({ label: "Manager", url: "" });
    if (userRoles.isOrderHandler)
      links.push({ label: "OrderHandler", url: "" });
    if (userRoles.isReceptionist)
      links.push({ label: "Receptionist", url: "" });
    return links;
  };

  //Profile
  public static getData = async (): Promise<ProfileData> => {
    const user_id: string = Store.state.user.id;
    if (user_id == "") return null;
    const userData: UserData = await new UserDocument(user_id).read();
    const countryData: CountryData = await new CountryDocument(
      userData.country_id
    ).read();
    delete userData.country_id;
    return { ...userData, country: countryData };
  };
}
