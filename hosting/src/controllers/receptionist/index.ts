//Plugin Imports
import { Module } from "vuex";
import Store, { RootState } from "@/plugins/vuex";

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
    setPage(state: ReceptionistControllerState, page?: ReceptionistPage) {
      if (page) state.page = page;
      else state.page = ReceptionistPage.none;
    },
    setModal(state: ReceptionistControllerState, modal?: ReceptionistModal) {
      if (modal) state.modal = modal;
      else state.modal = ReceptionistModal.none;
    },
    setOrderList(state: ReceptionistControllerState, order_ids?: string[]) {
      if (order_ids) state.order.list = order_ids;
      else state.order.list = [];
    },
    setOrderCurrent(state: ReceptionistControllerState, order_id?: string) {
      if (order_id) state.order.current = order_id;
      else state.order.current = "";
    },
    setReservationList(
      state: ReceptionistControllerState,
      reservation_ids?: string[]
    ) {
      if (reservation_ids) state.reservation.list = reservation_ids;
      else state.reservation.list = [];
    },
    setReservationCurrent(
      state: ReceptionistControllerState,
      reservation_id?: string
    ) {
      if (reservation_id) state.reservation.current = reservation_id;
      else state.reservation.current = "";
    }
  },
  getters: {
    getPage(state: ReceptionistControllerState) {
      return state.page;
    },
    getModal(state: ReceptionistControllerState) {
      return state.modal;
    },
    getOrderList(state: ReceptionistControllerState) {
      return state.order.list;
    },
    getOrderCurrent(state: ReceptionistControllerState) {
      return state.order.current;
    },
    getReseravationList(state: ReceptionistControllerState) {
      return state.reservation.list;
    },
    getReseravationCurrent(state: ReceptionistControllerState) {
      return state.reservation.current;
    }
  }
};
