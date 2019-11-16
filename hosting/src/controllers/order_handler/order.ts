//Plugin Imports
import Store from "@/plugins/vuex";
import { safePush } from "@/plugins/router";

//Controller Imports
import { OrderHandlerPage } from ".";

//Schema Import
import { EstablishmentDocument } from "@/models/establishment/schema";
import { OrderDocument } from "@/models/order/schema";

//Data Import
import { EstablishmentData } from "@/models/establishment/data";
import { OrderData } from "@/models/order/data";

//goToListPage
export async function goToListPage() {
  const establishment_id: string =
    Store.getters["userController/getUserEstablishment"];
  const establishment_data: EstablishmentData = await new EstablishmentDocument(
    establishment_id
  ).read();
  let orderList: {
    id: string;
    data: OrderData;
  }[] = [];
  Promise.all(
    establishment_data.order_ids.map(async (order_id: string) => {
      orderList.push({
        id: order_id,
        data: await new OrderDocument(order_id).read()
      });
    })
  ).then(() => {
    Store.commit("orderHandlerController/setOrderList", orderList);
    Store.commit("orderHandlerController/setPage", OrderHandlerPage.orderList);
    safePush("order_handler_order_list");
  });
}
