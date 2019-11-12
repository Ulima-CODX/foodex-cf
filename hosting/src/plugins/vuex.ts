import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);

import { userController } from "@/controllers/user";
import { adminController } from "@/controllers/admin";
import { managerController } from "@/controllers/manager";
import { orderHandlerController } from "@/controllers/order_handler";
import { receptionistController } from "@/controllers/receptionist";

export type RootState = {};
const store: StoreOptions<RootState> = {
  modules: {
    userController,
    adminController,
    managerController,
    orderHandlerController,
    receptionistController
  }
};
export default new Vuex.Store<RootState>(store);
