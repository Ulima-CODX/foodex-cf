//Plugin Imports
import Store from "@/plugins/vuex";
import { safePush } from "@/plugins/router";

//Controller Imports
import { AdminPage } from ".";

//Schema Import
import { EmployeeCollection } from "@/models/employee/schema";

//goToListPage
export async function goToListPage() {
  Store.commit(
    "adminController/setEmployeeList",
    await EmployeeCollection.read()
  );
  Store.commit("adminController/setPage", AdminPage.employeeList);
  safePush("admin_employee_list");
}
