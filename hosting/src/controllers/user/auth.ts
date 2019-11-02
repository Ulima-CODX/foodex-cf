//Plugin Imports
import { auth, FS_User } from "@/plugins/firebase";
import Store from "@/plugins/vuex";

//Controller Imports
import { safePush } from "./navigation";

//Schema Imports
import { EmployeeDocument } from "@/models/employee/schema";
import { AdminDocument } from "@/models/admin/schema";
import { ClientDocument } from "@/models/client/schema";

//Data Imports
import { EmployeeRoles } from "@/models/employee/data";

//Login function
export function login(email: string, password: string): void {
  auth
    .signInWithEmailAndPassword(email, password)
    .catch(err => console.log(err));
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
  safePush("profile");
}

//Logout function
export function logout(): void {
  auth.signOut().catch(err => console.log(err));
}
//Logout callback
async function onLogout(): Promise<void> {
  Store.dispatch("logout");
  safePush("login");
}

//Auth Listener
auth.onAuthStateChanged(
  async (user: FS_User | null): Promise<void> => {
    if (!user) await onLogout();
    else await onLogin(user.uid);
  }
);
