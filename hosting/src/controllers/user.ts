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

//Controller
export default abstract class UserController {
  //Login
  public static login = (email: string, password: string): void => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        if (!res.user) throw "auth/wrong-email";
        else {
          const isAdmin: boolean = await new AdminDocument(
            res.user.uid
          ).exists();
          const employeeRoles: EmployeeRoles = await new EmployeeDocument(
            res.user.uid
          ).getRoles();
          const isClient: boolean = await new ClientDocument(
            res.user.uid
          ).exists();
          UserController.onLoginSuccess(res.user.uid, {
            isAdmin,
            ...employeeRoles,
            isClient
          });
        }
      })
      .catch(err => {
        UserController.onLoginFail(err.code);
      });
  };
  private static onLoginSuccess(id: string, roles: UserRoles) {
    Store.dispatch("login", { id, roles });
    Router.push("/profile");
  }
  private static onLoginFail(errCode: string) {
    alert("Could not login!");
    console.error(errCode);
    Store.dispatch("logout");
  }

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
