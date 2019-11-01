//Plugin Imports
import { auth, FS_User } from "@/plugins/firebase";
import Router from "@/plugins/router";
import Store from "@/plugins/vuex";

//Schema Imports
import { EmployeeDocument } from "@/models/employee/schema";
import { AdminDocument } from "@/models/admin/schema";
import { ClientDocument } from "@/models/client/schema";

//Data Imports
import { EmployeeRoles } from "@/models/employee/data";
import { UserRoles } from "@/models/user/data";

//Login function
export function login(email: string, password: string): void {
  auth
    .signInWithEmailAndPassword(email, password)
    .catch(err => console.log(err));
}

//Logout function
export function logout() {
  Store.dispatch("logout");
  Router.push("/");
}

//Auth Listener
auth.onAuthStateChanged(
  async (user: FS_User | null): Promise<void> => {
    if (!user) logout();
    else {
      const isAdmin: boolean = await new AdminDocument(user.uid).exists();
      const employeeRoles: EmployeeRoles = await new EmployeeDocument(
        user.uid
      ).getRoles();
      const isClient: boolean = await new ClientDocument(user.uid).exists();
      Store.dispatch("login", {
        id: user.uid,
        roles: { isAdmin, ...employeeRoles, isClient }
      });
      Router.push("/profile");
    }
  }
);
