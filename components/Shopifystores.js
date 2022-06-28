import express from "express";
import { client } from "../index.js";
import { ObjectId } from "mongodb";
const router = express.Router();

router.get("/", async function (req, res) {
  const data = await client.db("music").collection("shopify").find().toArray();
  res.send(data);
});

router.post("/", async function (req, res) {
  const data = await client
    .db("music")
    .collection("shopify")
    .insertMany(req.body);
  res.send(data);
});
router.put("/:id", async function (req, res) {
  const { id } = req.params;
  console.log(id);
  const shopifystores = req.body;
  console.log(shopifystores);
  const data = await client
    .db("music")
    .collection("shopify")
    .updateOne({ _id: ObjectId(id) }, { $set: shopifystores });
  res.send(data);
});

router.get("/:id", async function (req, res) {
  console.log(req.params.id);
  const dataById = await client
    .db("music")
    .collection("shopify")
    .findOne({ _id: ObjectId(req.params.id) });
  res.send(dataById);
});

router.post("/getByname", async (req, res) => {
  const val = req.body.name;
  console.log(val);
  const regex = new RegExp([val].join(""), "i");
  const allTasks = await client
    .db("music")
    .collection("shopify")
    .find({ name: { $regex: regex } })
    .toArray(); // if(!allTasks || allTasks.length === 0) res.status(400).send({error : "No task was found"})// res.status(200).send(allTasks)res.send(allTasks)})
  console.log(allTasks);
  res.send(allTasks);
});
router.get("/:limit/:skip", async function (request, response) {
  const Count1 = await client.db("music").collection("shopify").find().count();

  console.log(Count1);

  const limit1 = request.params.limit;

  const skip1 = request.params.skip;

  const app = await client
    .db("music")
    .collection("shopify")
    .find()
    .limit(parseInt(limit1))
    .skip(parseInt(skip1))
    .toArray();

  const data = {
    count: Count1,

    value: app,
  };

  response.send(data);
});

export const shopifystores = router;
