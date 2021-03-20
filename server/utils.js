import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";

export function readFile(path) {
  return readFileSync(resolve(dirname(""), path), "utf8");
}

export function writeFile(path, data) {
  return writeFileSync(resolve(dirname(""), path), JSON.stringify(data));
}

module.exports = {
  readFile,
  writeFile,
};
