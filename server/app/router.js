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
router.get("/contacts", async (req, res) => {
  const queries = Object.keys(req.query);
  const values = Object.values(req.query);
  const contacts = await client
    .db(name)
    .collection(collectionName)
    .find({ [queries[0]]: { $regex: values[0], $options: "i" } })
    .toArray();

  console.log(req.query);

  res.json(contacts);
});
export default router;
