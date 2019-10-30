//Plugin Imports
import { auth } from "@/plugins/firebase";
import Router from "@/plugins/router";
import Store from "@/plugins/vuex";

//Schema Imports
import { EmployeeDocument } from "@/models/employee/schema";
import { AdminDocument } from "@/models/admin/schema";

//Data Imports
import { EmployeeRoles } from "@/models/employee/data";
import { UserRoles } from "@/models/user/data";
import { ClientDocument } from "@/models/client/schema";

//Controller
export default abstract class UserController {
  private static onLoginSuccess(id: string, roles: UserRoles) {
    alert("Login successful");
    Store.dispatch("login", { id, roles });
  }
  private static onLoginFail(errCode: string) {
    alert("Could not login!");
    console.error(errCode);
    Store.dispatch("logout");
  }

  public static login = (email: string, password: string): void => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        if (!res.user) throw "auth/wrong-password";
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
}
