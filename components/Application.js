import express from "express";
import { ObjectId } from "mongodb";
import { client } from "../index.js";
const router = express.Router();
router.get("/", async function (req, res) {
  const data = await client
    .db("music")
    .collection("Application")
    .find()
    .toArray();
  res.send(data);
});
router.post("/", async function (req, res) {
  const data = await client
    .db("music")
    .collection("Application")
    .insertMany(req.body);
  res.send(data);
});
router.get("/:id", async function (req, res) {
  console.log(req.params.id);
  const dataById = await client
    .db("music")
    .collection("Application")
    .findOne({ _id: ObjectId(req.params.id) });
  res.send(dataById);
});
router.post("/getByname", async (req, res) => {
  const val = req.body.name;
  const regex = new RegExp([val].join(""), "i");
  const allTasks = await client
    .db("music")
    .collection("Application")
    .find({ name: { $regex: regex } })
    .toArray(); // if(!allTasks || allTasks.length === 0) res.status(400).send({error : "No task was found"})// res.status(200).send(allTasks)res.send(allTasks)})
  res.send(allTasks);
});
router.put("/:id", async function (req, res) {
  const Application = req.body;
  console.log(Application);
  const data = await client
    .db("music")
    .collection("Application")
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: Application });
  res.send(data);
});
router.post("/getByname", async (req, res) => {
  const val = req.body.name;
  console.log(val);
  const regex = new RegExp([val].join(""), "i");
  console.log(regex);
  const allTasks = await client
    .db("music")
    .collection("Application")
    .find({ name: { $regex: regex } })
    .toArray(); // if(!allTasks || allTasks.length === 0) res.status(400).send({error : "No task was found"})// res.status(200).send(allTasks)res.send(allTasks)})
  res.send(allTasks);
});
router.get("/:limit/:skip", async function (request, response) {
  const Count1 = await client
    .db("music")
    .collection("Application")
    .find()
    .count();

  console.log(Count1);

  const limit1 = request.params.limit;

  const skip1 = request.params.skip;

  const app = await client
    .db("music")
    .collection("Application")
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
export const Application = router;
