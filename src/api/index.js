import request from "./axios";

/**
 * 首页新闻列表
 * @start {int} 起始页 default: 1
 * @num {int}	获取数量 default: 10
 */
export const getNewList = (params) => {
  return request({
    url: "/new/toutiao",
    method: "get",
    params,
  });
};

/**
 * 网易新闻详情
 * @param {string} docid 网易新闻的docid
 */
export const getNewDetails = (docid) => {
  return request.get(`/api/new/detail?docid=${docid}`);
};

/**
 * 获取随机头像
 * @param {Number} type 性别
 */
export const getAvatar = (type = 2) => {
  const types = ["男", "女", "动漫"];
  return request({
    url: "https://api.66mz8.com/api/rand.portrait.php",
    method: "get",
    params: {
      type: types[type],
      format: "json",
    },
  });
};

/**
 * 获取随机背景图片
 */
export const getBackgroundImg = () => {
  return request.get("https://api.66mz8.com/api/bg.img.php?format=json");
};

/**
 * 用户登录
 */
export const userLogin = (data) => {
  return request.post("/sys-api/login", data);
};

/**
 * 用户注册
 */
export const userRegist = (data) => {
  return request.post("/sys-api/regist", data);
};
