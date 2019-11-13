//Plugin Imports
import { Module } from "vuex";
import { RootState } from "@/plugins/vuex";

//Page Export
export enum AdminPage {
  none,
  employeeList,
  establishmentList,
  establishmentDetail
}

//Modal Export
export enum AdminModal {
  none,
  establishmentNew,
  employeeSelector_manager,
  employeeSelector_order_handler,
  employeeSelector_receptionist
}

//Module State Type Export
export type AdminControllerState = {
  page: AdminPage;
  modal: AdminModal;
  employee: {
    list: string[];
  };
  establishment: {
    list: string[];
    current: string;
  };
};

//Module Instance Export
export const adminController: Module<AdminControllerState, RootState> = {
  namespaced: true,
  state: {
    page: AdminPage.none,
    modal: AdminModal.none,
    employee: {
      list: []
    },
    establishment: {
      list: [],
      current: ""
    }
  },
  mutations: {
    setPage(state: AdminControllerState, page?: AdminPage) {
      if (page) state.page = page;
      else state.page = AdminPage.none;
    },
    setModal(state: AdminControllerState, modal?: AdminModal) {
      if (modal) state.modal = modal;
      else state.modal = AdminModal.none;
    },
    setEmployeeList(state: AdminControllerState, employee_ids?: string[]) {
      if (employee_ids) state.employee.list = employee_ids;
      else state.employee.list = [];
    },
    setEstablishmentList(
      state: AdminControllerState,
      establishment_ids?: string[]
    ) {
      if (establishment_ids) state.establishment.list = establishment_ids;
      else state.establishment.list = [];
    },
    setEstablishmentCurrent(
      state: AdminControllerState,
      establishment_id?: string
    ) {
      if (establishment_id) state.establishment.current = establishment_id;
      else state.establishment.current = "";
    }
  },
  getters: {
    getPage(state: AdminControllerState) {
      return state.page;
    },
    getModal(state: AdminControllerState) {
      return state.modal;
    },
    getEmployeeList(state: AdminControllerState) {
      return state.employee.list;
    },
    getEstablishmentList(state: AdminControllerState) {
      return state.establishment.list;
    },
    getEstablishmentCurrent(state: AdminControllerState) {
      return state.establishment.current;
    }
  }
};
