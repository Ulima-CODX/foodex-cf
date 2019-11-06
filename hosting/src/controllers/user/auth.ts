//Plugin Imports
import { auth, FS_User } from "@/plugins/firebase";
import Store from "@/plugins/vuex";

//Controller Import
import { safePush } from "./navigation";

//Schema Imports
import { EmployeeDocument } from "@/models/employee/schema";
import { AdminDocument } from "@/models/admin/schema";
import { ClientDocument } from "@/models/client/schema";

//Data Imports
import { EmployeeRoles } from "@/models/employee/data";

//Login function
export function login(email: string, password: string): void {
  Store.commit("setAuthStatus", "login_start");
  auth.signInWithEmailAndPassword(email, password).catch(err => {
    Store.commit("setAuthStatus", "login_fail");
    console.log(err);
  });
}
//Login callback
async function onLogin(user_id: string): Promise<void> {
  const isAdmin: boolean = await new AdminDocument(user_id).exists();
  const employeeRoles: EmployeeRoles = await new EmployeeDocument(
    user_id
  ).getRoles();
  const isClient: boolean = await new ClientDocument(user_id).exists();
  Store.dispatch("login", {
    id: user_id,
    roles: { isAdmin, ...employeeRoles, isClient }
  });
  Store.commit("setAuthStatus", "login_ok");
  safePush("profile");
}

//Logout function
export function logout(): void {
  Store.commit("setAuthStatus", "logout_start");
  auth.signOut().catch(err => {
    Store.commit("setAuthStatus", "logout_fail");
    console.log(err);
  });
}
//Logout callback
async function onLogout(): Promise<void> {
  Store.dispatch("logout");
  Store.commit("setAuthStatus", "logout_ok");
  safePush("login");
}

//Auth Listener
auth.onAuthStateChanged(
  async (user: FS_User | null): Promise<void> => {
    if (!user) await onLogout();
    else await onLogin(user.uid);
  }
);
