//Schema Import
import { MenuCollection, MenuDocument } from "@/models/menu/schema";
import { DishCollection, DishDocument } from "@/models/dish/schema";

//Plugin Import
import Store from "@/plugins/vuex";
import { safePush } from "@/plugins/router";

//Data Import
import { MenuData } from "@/models/menu/data";
import { DishData } from "@/models/dish/data";

//getData
export async function getData(
  menu_id: string
): Promise<{ id: string; data: DishData }[]> {
  const menuData: MenuData = await new MenuDocument(menu_id).read();
  return await Promise.all(
    menuData.dish_ids.map(async (dish_id: string) => ({
      id: dish_id,
      data: await new DishDocument(dish_id).read()
    }))
  );
}

//goToDetail
export function goToDetailPage(dish_title: string) {
  Store.commit("adminController/setPage"); //Adaptar a menu
  safePush("admin_establishment_detail", { //Adaptar a menu
    title: dish_title
  });
}