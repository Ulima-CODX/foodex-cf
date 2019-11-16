//Plugin Imports
import Store from "@/plugins/vuex";
import { safePush } from "@/plugins/router";

//Controller Import
import { ManagerPage } from ".";

//goToDetailPage
export async function goToDetailPage(dish_id: string) {
  Store.commit("managerController/setDishCurrent", dish_id);
  Store.commit("managerController/setPage", ManagerPage.dishDetail);
  safePush("manager_dish_detail");
}
