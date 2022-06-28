import express from "express";
import { ObjectId } from "mongodb";
import { client } from "../index.js";
const router = express.Router();
router.get("/", async function (req, res) {
  const data = await client
    .db("music")
    .collection("authenticationprovider")
    .find()
    .toArray();
  res.send(data);
});

router.post("/", async function (req, res) {
  const data = await client
    .db("music")
    .collection("authenticationprovider")
    .insertMany(req.body);
  res.send(data);
});
router.get("/:id", async function (req, res) {
  console.log(req.params.id);
  const dataById = await client
    .db("music")
    .collection("authenticationprovider")
    .findOne({ _id: ObjectId(req.params.id) });
  res.send(dataById);
});
router.put("/:id", async function (req, res) {
  const authenticationprovider = req.body;
  console.log(authenticationprovider);
  const data = await client
    .db("music")
    .collection("authenticationprovider")
    .updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: authenticationprovider }
    );
  res.send(data);
});
router.post("/getByname", async (req, res) => {
  const val = req.body.name;
  console.log(val);
  const regex = new RegExp([val].join(""), "i");
  console.log(regex);
  const allTasks = await client
    .db("music")
    .collection("authenticationprovider")
    .find({ name: { $regex: regex } })
    .toArray(); // if(!allTasks || allTasks.length === 0) res.status(400).send({error : "No task was found"})// res.status(200).send(allTasks)res.send(allTasks)})
  res.send(allTasks);
});
router.get("/:limit/:skip", async function (request, response) {
  const Count1 = await client
    .db("music")
    .collection("authenticationprovider")
    .find()
    .count();

  console.log(Count1);

  const limit1 = request.params.limit;

  const skip1 = request.params.skip;

  const app = await client
    .db("music")
    .collection("authenticationprovider")
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


export const authentication = router;
