import fs from "fs";

export const getData = fs.readFile("./data.js", function (err, data) {
  if (err) {
    return console.error(err);
  }
  console.log("异步读取: " + data.toString());
  return data;
});
