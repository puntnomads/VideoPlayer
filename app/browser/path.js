import fs from "fs";
import path from "path";

import app from "app";

const appDataFolder = path.join(app.getPath("userData"));
const appDataFile = path.join(appDataFolder, "path.json");

export const savePath = (currentFilePath) => {
  console.log("saving to", appDataFolder);
  try {
    fs.mkdirSync(appDataFolder);
  } catch(e) {}

  const data = JSON.stringify(currentFilePath);
  fs.writeFileSync(appDataFile, data);
  console.log(app.getPath('userData'));
};

export const loadPath = (callback) => {
  try {
    const buffer = fs.readFileSync(appDataFile);
    const data = buffer.toString("utf8");
    const json = JSON.parse(data);
    callback(json);
  } catch (e) {
    console.log("No file path to load!");
    callback([]);
  }
}
