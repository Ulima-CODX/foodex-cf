//Plugin Imports
import { Module } from "vuex";
import { RootState } from "@/plugins/vuex";

//Page Export
export enum ReceptionistPage {
  none,
  orderList,
  reservationList
}

//Modal Export
export enum ReceptionistModal {
  none,
  orderDetail,
  reservationDetail
}

//Module State Type Export
export type ReceptionistControllerState = {
  page: ReceptionistPage;
  modal: ReceptionistModal;
  order: {
    list: string[];
    current: string;
  };
  reservation: {
    list: string[];
    current: string;
  };
};

//Module Instance Export
export const receptionistController: Module<
  ReceptionistControllerState,
  RootState
> = {
  namespaced: true,
  state: {
    page: ReceptionistPage.none,
    modal: ReceptionistModal.none,
    order: {
      list: [],
      current: ""
    },
    reservation: {
      list: [],
      current: ""
    }
  },
  mutations: {
    setPage(state: any, page?: ReceptionistPage) {
      if (page) state.page = page;
      else state.page = ReceptionistPage.none;
    },
    setModal(state: any, modal?: ReceptionistModal) {
      if (modal) state.modal = modal;
      else state.modal = ReceptionistModal.none;
    },
    setOrderList(state: any, order_ids?: string[]) {
      if (order_ids) state.order.list = order_ids;
      else state.order.list = [];
    },
    setOrderCurrent(state: any, order_id?: string) {
      if (order_id) state.order.current = order_id;
      else state.order.current = "";
    },
    setReservationList(state: any, reservation_ids?: string[]) {
      if (reservation_ids) state.reservation.list = reservation_ids;
      else state.reservation.list = [];
    },
    setReservationCurrent(state: any, reservation_id?: string) {
      if (reservation_id) state.reservation.current = reservation_id;
      else state.reservation.current = "";
    }
  },
  getters: {
    getPage(state: any) {
      return state.page;
    },
    getModal(state: any) {
      return state.modal;
    },
    getOrderList(state: any) {
      return state.order.list;
    },
    getOrderCurrent(state: any) {
      return state.order.current;
    },
    getReseravationList(state: any) {
      return state.reservation.list;
    },
    getReseravationCurrent(state: any) {
      return state.reservation.current;
    }
  }
};
