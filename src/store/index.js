import { createStore } from "vuex";

export default createStore({
  state: {
    theme: "",
    isLogin: false,
    user: {},
  },
  mutations: {
    login(state, user) {
      state.user = user;
      state.isLogin = true;
    },
    // 修改主题
    toggleTheme(state, theme) {
      console.log("store", theme);
      state.theme = theme;
    },
  },
});
