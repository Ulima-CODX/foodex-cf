import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);

export type RootState = {};
const store: StoreOptions<RootState> = {};
export default new Vuex.Store<RootState>(store);
