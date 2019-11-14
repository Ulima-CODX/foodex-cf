//Plugin Imports
import { Module } from "vuex";
import { RootState } from "@/plugins/vuex";

//Controller Imports
import { AuthStatus } from "./auth";

//Data Imports
import { UserRoles } from "@/models/user/data";

//Page Export
export enum UserPage {
  "login",
  "register",
  "about",
  "profile"
}

//Module State Type Export
export type UserControllerState = {
  page: UserPage;
  authStatus: AuthStatus;
  user: {
    current: string;
    roles: UserRoles;
    establishment: {
      current: string;
    };
  };
};

const init_roles: UserRoles = {
  isAdmin: false,
  isManager: false,
  isOrderHandler: false,
  isReceptionist: false,
  isClient: false
};

//Module Instance Export
export const userController: Module<UserControllerState, RootState> = {
  namespaced: true,
  state: {
    page: UserPage.login,
    authStatus: AuthStatus.waiting,
    user: {
      current: "",
      roles: init_roles,
      establishment: {
        current: ""
      }
    }
  },
  mutations: {
    setAuthStatus(state: UserControllerState, authStatus: AuthStatus) {
      state.authStatus = authStatus;
    },
    setUserCurrent(state: UserControllerState, user_id?: string) {
      if (user_id) state.user.current = user_id;
      else state.user.current = "";
    },
    setUserRoles(state: UserControllerState, roles?: UserRoles) {
      if (roles) state.user.roles = roles;
      else state.user.roles = init_roles;
    },
    setUserEstablishment(state: UserControllerState, establishment_id: string) {
      if (establishment_id) state.user.establishment.current = establishment_id;
      else state.user.establishment.current = "";
    },
    setPage(state: UserControllerState, page: UserPage) {
      state.page = page;
    }
  },
  getters: {
    getAuthStatus(state: UserControllerState) {
      return state.authStatus;
    },
    getUserCurrent(state: UserControllerState) {
      return state.user.current;
    },
    getUserRoles(state: UserControllerState) {
      return state.user.roles;
    },
    getUserEstablishment(state: UserControllerState) {
      return state.user.establishment.current;
    },
    getPage(state: UserControllerState) {
      return state.page;
    }
  }
};
