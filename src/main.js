import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "./assets/style/reset.css";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus, { size: "small" });
app.mount("#app");
