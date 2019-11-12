//Plugin Imports
import { Module } from "vuex";
import { RootState } from "@/plugins/vuex";

//Page Export
export enum OrderHandlerPage {
  none,
  menuDetail_dishList,
  dishDetail,
  orderList
}

//Module State Type Export
export type OrderHandlerControllerState = {
  page: OrderHandlerPage;
  menu: {
    current: string;
  };
  dish: {
    list: string[];
    current: string;
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
      list: [],
      current: ""
    }
  },
  mutations: {
    setPage(state: any, page?: OrderHandlerPage) {
      if (page) state.page = page;
      else state.page = OrderHandlerPage.none;
    },
    setMenuCurrent(state: any, menu_id?: string) {
      if (menu_id) state.menu = menu_id;
      else state.menu = "";
    },
    setDishList(state: any, dish_ids?: string[]) {
      if (dish_ids) state.dish.list = dish_ids;
      else state.dish.list = [];
    },
    setDishCurrent(state: any, dish_id?: string) {
      if (dish_id) state.dish.current = dish_id;
      else state.dish.current = "";
    }
  },
  getters: {
    getPage(state: any) {
      return state.page;
    },
    setMenuCurrent(state: any, menu_id?: string) {
      if (menu_id) state.menu = menu_id;
      else state.menu = "";
    },
    setDishList(state: any, dish_ids?: string[]) {
      if (dish_ids) state.dish.list = dish_ids;
      else state.dish.list = [];
    },
    setDishCurrent(state: any, dish_id?: string) {
      if (dish_id) state.dish.current = dish_id;
      else state.dish.current = "";
    }
  }
};
