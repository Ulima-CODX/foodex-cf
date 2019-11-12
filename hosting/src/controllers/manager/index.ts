//Plugin Imports
import { Module } from "vuex";
import { RootState } from "@/plugins/vuex";

//Page Export
export enum ManagerPage {
  none,
  establishmentDetail,
  menuDetail_dishList,
  dishDetail
}

//Modal Export
export enum ManagerModal {
  none,
  dishNew,
  reservationLimitDetail
}

//Module State Type Export
export type ManagerControllerState = {
  page: ManagerPage;
  modal: ManagerModal;
  menu: {
    current: string;
  };
  dish: {
    list: string[];
    current: string;
  };
};

//Module Instance Export
export const managerController: Module<ManagerControllerState, RootState> = {
  namespaced: true,
  state: {
    page: ManagerPage.none,
    modal: ManagerModal.none,
    menu: {
      current: ""
    },
    dish: {
      list: [],
      current: ""
    }
  },
  mutations: {
    setPage(state: any, page?: ManagerPage) {
      if (page) state.page = page;
      else state.page = ManagerPage.none;
    },
    setModal(state: any, modal?: ManagerModal) {
      if (modal) state.modal = modal;
      else state.modal = ManagerModal.none;
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
    getModal(state: any) {
      return state.modal;
    },
    getMenuCurrent(state: any) {
      return state.menu.current;
    },
    getDishList(state: any) {
      return state.dish.list;
    },
    getDishCurrent(state: any) {
      return state.dish.current;
    }
  }
};
