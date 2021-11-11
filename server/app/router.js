import Router from "express";
import config from "./config.js";
import client from "./db/client.js";

const {
  db: { name, collectionName },
} = config;

const router = new Router();

// localhost:3000/api
router.get("/", (_, res) => {
  res.send("Hello from API router");
});

// localhost:3000/products
router.get("/contacts", async (_, res) => {
  const contacts = await client
    .db(name)
    .collection(collectionName)
    .find({})
    .toArray();
  console.log(contacts);
  res.json(contacts);
});
export default router;
