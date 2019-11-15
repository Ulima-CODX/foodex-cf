//Plugin Imports
import Store from "@/plugins/vuex";
import { safePush } from "@/plugins/router";

//Controller Imports
import { ManagerPage, ManagerModal } from ".";

//Schema Import
import { EstablishmentDocument } from "@/models/establishment/schema";
import { MenuDocument } from "@/models/menu/schema";
import { DishCollection, DishDocument } from "@/models/dish/schema";

//Data Import
import { EstablishmentData } from "@/models/establishment/data";
import { MenuData } from "@/models/menu/data";
import { DishData } from "@/models/dish/data";

//goToDetailPage
export async function goToDetailPage() {
  const establishment_id: string =
    Store.getters["userController/getUserEstablishment"];
  const establishment_data: EstablishmentData = await new EstablishmentDocument(
    establishment_id
  ).read();
  if (establishment_data.menu_id == undefined) return [];
  Store.commit("managerController/setMenuCurrent", establishment_data.menu_id);
  const menuData: MenuData = await new MenuDocument(
    establishment_data.menu_id
  ).read();
  let dishList: {
    id: string;
    data: DishData;
  }[] = [];
  Promise.all(
    menuData.dish_ids.map(async (dish_id: string) => {
      dishList.push({
        id: dish_id,
        data: await new DishDocument(dish_id).read()
      });
    })
  ).then(() => {
    Store.commit("managerController/setDishList", dishList);
    Store.commit("managerController/setPage", ManagerPage.menuDetail_dishList);
    safePush("manager_menu_detail");
  });
}

//showNewModal
export function showNewModal() {
  Store.commit("managerController/setModal", ManagerModal.dishNew);
}

//hideModal
export function hideNewModal() {
  Store.commit("managerController/setModal");
}

//addDish
export async function addDish(data: {
  name: string;
  description: string;
  price: string;
}) {
  const establishment_id: string =
    Store.getters["userController/getUserEstablishment"];
  const establishment_data: EstablishmentData = await new EstablishmentDocument(
    establishment_id
  ).read();
  if (establishment_data.menu_id == undefined) return;
  const menu: MenuDocument = new MenuDocument(establishment_data.menu_id);
  const dish: DishDocument = await DishCollection.create(
    data.name,
    data.description,
    parseInt(data.price)
  );
  menu.addDish(dish);
}
