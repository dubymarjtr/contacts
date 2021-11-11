import { promises as fs } from "fs";
import config from "../config.js";
import once from "./once.js";

const {
  db: { name, collectionName },
} = config;

(async () => {
  const conn = await once.connect();
  const data = await fs.readFile("data.json", "utf-8");
  await conn.db(name).collection(collectionName).deleteMany({});
  await conn.db(name).collection(collectionName).insertMany(JSON.parse(data));
  conn.close();
})();
