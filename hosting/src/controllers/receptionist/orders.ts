//Plugin Imports
import Store from "@/plugins/vuex";
import { safePush } from "@/plugins/router";

//Controller Imports
import { ReceptionistPage, ReceptionistModal } from ".";

//Schema Import
import { EstablishmentDocument } from "@/models/establishment/schema";
import { OrderDocument } from "@/models/order/schema";

//Data Import
import { EstablishmentData } from "@/models/establishment/data";
import { OrderData } from "@/models/order/data";

//goToList
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
    Store.commit("receptionistController/setOrderList", orderList);
    Store.commit("receptionistController/setPage", ReceptionistPage.orderList);
    safePush("receptionist_orders");
  });
}

//showDetailModal
export function showDetailModal() {
  Store.commit(
    "receptionistController/setModal",
    ReceptionistModal.orderDetail
  );
}
//hideDetailModal
export function hideDetailModal() {
  Store.commit("receptionistController/setModal");
}
