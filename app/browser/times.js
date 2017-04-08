import fs from "fs";
import path from "path";

import app from "app";

const appDataFolder = path.join(app.getPath("userData"));
const appDataFile = path.join(appDataFolder, "times.json");

export const saveTimes = (videoTimes) => {
  console.log("saving to", appDataFolder);
  try {
    fs.mkdirSync(appDataFolder);
  } catch(e) {}

  const data = JSON.stringify(videoTimes);
  fs.writeFileSync(appDataFile, data);
};

export const loadTimes = (callback) => {
  try {
    const buffer = fs.readFileSync(appDataFile);
    const data = buffer.toString("utf8");
    const json = JSON.parse(data);
    callback(json);
  } catch (e) {
    console.log("No times to load!");
    callback([]);
  }
}
