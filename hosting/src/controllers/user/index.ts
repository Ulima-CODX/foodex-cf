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
      roles: init_roles
    }
  },
  mutations: {
    setAuthStatus(state: any, authStatus: AuthStatus) {
      state.authStatus = authStatus;
    },
    setUserCurrent(state: any, user_id?: string) {
      if (user_id) state.user.current = user_id;
      else state.user.current = "";
    },
    setUserRoles(state: any, roles?: UserRoles) {
      if (roles) state.user.roles = roles;
      else state.user.roles = init_roles;
    },
    setPage(state: any, page: UserPage) {
      state.page = page;
    }
  },
  getters: {
    getAuthStatus(state: any) {
      return state.user.authStatus;
    },
    getUserCurrent(state: any) {
      return state.user.current;
    },
    getUserRoles(state: any) {
      return state.user.roles;
    },
    getPage(state: any) {
      return state.page;
    }
  }
};
