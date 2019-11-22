//Plugin Imports
import Store from "@/plugins/vuex";
import { safePush } from "@/plugins/router";

//Controller Imports
import { OrderHandlerPage } from ".";

//Schema Import
import { EstablishmentDocument } from "@/models/establishment/schema";
import { OrderDocument } from "@/models/order/schema";
import { UserDocument } from "@/models/user/schema";
import { DishDocument } from "@/models/dish/schema";

//Data Import
import { EstablishmentData } from "@/models/establishment/data";
import { OrderDisplayData, OrderData } from "@/models/order/data";
import { UserData } from "@/models/user/data";
import { DishData } from "@/models/dish/data";

//goToListPage
export async function goToListPage() {
  const establishment_id: string =
    Store.getters["userController/getUserEstablishment"];
  const establishment_data: EstablishmentData = await new EstablishmentDocument(
    establishment_id
  ).read();
  let orderList: {
    id: string;
    data: OrderDisplayData;
  }[] = [];
  Promise.all(
    establishment_data.order_ids.map(async (order_id: string) => {
      const orderData: OrderData = await new OrderDocument(order_id).read();
      console.log("OrderData", orderData);
      const userData: UserData = await new UserDocument(
        orderData.client_id
      ).read();
      console.log("UserData", userData);
      const dishList: {
        id: string;
        name: string;
      }[] = await Promise.all(
        Object.keys(orderData.dish_ids).map(async (dish_id: string) => ({
          id: dish_id,
          name: (await new DishDocument(dish_id).read()).name
        }))
      );
      console.log("DishData", dishList);
      orderList.push({
        id: order_id,
        data: {
          status: orderData.status,
          client: {
            id: orderData.client_id,
            firstName: userData.first_name,
            lastName: userData.last_name
          },
          dishes: dishList,
          comment: orderData.comment,
          total: orderData.total,
          discount: orderData.discount,
          total_to_pay: orderData.total_to_pay,
          time: orderData.time.toDate()
        }
      });
    })
  ).then(() => {
    Store.commit("orderHandlerController/setOrderList", orderList);
    Store.commit("orderHandlerController/setPage", OrderHandlerPage.orderList);
    safePush("order_handler_order_list");
  });
}
