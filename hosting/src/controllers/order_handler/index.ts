//Plugin Imports
import { Module } from "vuex";
import { RootState } from "@/plugins/vuex";

//Data Import
import { DishData } from "@/models/dish/data";
import { OrderData } from "@/models/order/data";

//Page Export
export enum OrderHandlerPage {
  none,
  menuDetail_dishList,
  orderList
}

//Module State Type Export
export type OrderHandlerControllerState = {
  page: OrderHandlerPage;
  menu: {
    current: string;
  };
  dish: {
    list: {
      id: string;
      data: DishData;
    }[];
  };
  order: {
    list: {
      id: string;
      data: OrderData;
    }[];
  };
};

//Module Instace Export
export const orderHandlerController: Module<
  OrderHandlerControllerState,
  RootState
> = {
  namespaced: true,
  state: {
    page: OrderHandlerPage.none,
    menu: {
      current: ""
    },
    dish: {
      list: []
    },
    order: {
      list: []
    }
  },
  mutations: {
    setPage(state: OrderHandlerControllerState, page?: OrderHandlerPage) {
      if (page) state.page = page;
      else state.page = OrderHandlerPage.none;
    },
    setMenuCurrent(state: OrderHandlerControllerState, menu_id?: string) {
      if (menu_id) state.menu.current = menu_id;
      else state.menu.current = "";
    },
    setDishList(
      state: OrderHandlerControllerState,
      dishes?: {
        id: string;
        data: DishData;
      }[]
    ) {
      if (dishes) state.dish.list = dishes;
      else state.dish.list = [];
    },
    setOrderList(
      state: OrderHandlerControllerState,
      orders: {
        id: string;
        data: OrderData;
      }[]
    ) {
      if (orders) state.order.list = orders;
      else state.order.list = [];
    }
  },
  getters: {
    getPage(state: OrderHandlerControllerState) {
      return state.page;
    },
    getMenuCurrent(state: OrderHandlerControllerState) {
      return state.menu.current;
    },
    getDishList(state: OrderHandlerControllerState) {
      return state.dish.list;
    }
  }
};
