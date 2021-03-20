import express from "express";
import bodyParse from "body-parser";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";

class Utils {
  // 读取文件
  static readFile(dataName) {
    let data = readFileSync(
      resolve(dirname(""), `./server/data/${dataName}.json`),
      "utf8"
    );
    return JSON.parse(data);
  }
  // 写入文件
  static writeFile(dataName, data) {
    return writeFileSync(
      resolve(dirname(""), `./server/data/${dataName}.json`),
      JSON.stringify(data)
    );
  }
  // 报错处理
  static error(res, code, msg = "请联系管理员") {
    res.send({
      code,
      data: null,
      msg,
    });
  }
  // 成功处理
  static success(res, data = null) {
    res.send({
      code: 200,
      data: data,
      msg: "success",
    });
  }
}

const app = express();
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS");
  next();
});

// 用户登录
app.post("/login", function (req, res) {
  const { username, password } = req.body;
  let user = Utils.readFile("user");
  let userinfo = user.find((i) => i.username === username);
  if (!userinfo || userinfo.password != password) {
    Utils.error(res, 403, "账号或密码错误，请重新登录");
    return;
  }
  Utils.success(res, userinfo);
});

// 用户注册
app.post("/regist", function (req, res) {
  const { username, password } = req.body;
  let userList = Utils.readFile("user");
  console.log(typeof userList);
  let userinfo = userList.find((i) => i.username === username);
  if (!username || !password) {
    Utils.error(res, 403, "账号密码不能为空");
    return;
  }
  if (userinfo) {
    Utils.error(res, 403, "用户名重复，请重新注册");
    return;
  }
  let registUser = {
    id: new Date().getTime(),
    username,
    password,
    nickname: username,
    sex: 0,
    avatar:
      "https://tva4.sinaimg.cn/large/005ucgoIly1g3iihv8xsmj30b40b4acn.jpg",
  };
  Utils.writeFile("user", [...userList, registUser]);
  Utils.success(res, registUser);
});

app.listen(8080, function () {
  console.log("Welcome to express");
  console.log("Listen on Port 8080");
});
