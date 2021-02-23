import { createStore } from "vuex";

export default createStore({
  state: {
    isLogin: false,
    user: {},
  },
  mutations: {
    login(state, user) {
      state.user = user;
      state.isLogin = true;
    },
  },
});
