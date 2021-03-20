import axios from "axios";
import { ElMessage } from "element-plus";

let config = {
  timeout: 60 * 1000 * 2,
  //withCredentials: true,
  //baseURL: "https://v1.alapi.cn/api",
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  async (config) => {
    config.headers = {
      "Content-Type": "application/json;charset=UTF-8",
    };
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  (response) => {
    if (response.data.code !== 200) {
      response.data.msg && ElMessage.error(response.data.msg);
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default _axios;
