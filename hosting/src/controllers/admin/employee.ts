//Plugin Imports
import Store from "@/plugins/vuex";
import { safePush } from "@/plugins/router";

//Controller Imports
import { AdminPage } from ".";

//goToList
export function goToListPage() {
  Store.commit("adminController/setPage", AdminPage.employeeList);
  safePush("admin_employee_list");
}
