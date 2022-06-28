import express from "express";
import { MongoClient } from "mongodb";
import { authentication } from "./components/Authenticationproviders.js";
import { providers } from "./components/Providers.js";
import { Application } from "./components/Application.js";
import { shopifystores } from "./components/Shopifystores.js";
import cors from "cors";

const app = express();
app.use(cors());
const MONGODB_URL =
  "mongodb+srv://gowthaman:hello123@cluster0.qbqcx.mongodb.net";
async function createConnection() {
  const client = new MongoClient(MONGODB_URL);
  await client.connect();
  console.log("mongo connected");
  return client;
}
export const client = await createConnection();
app.use(express.json());
app.use("/authenticationproviders", authentication);
app.use("/shopifystores", shopifystores);
app.use("/providers", providers);
app.use("/Application", Application);

app.listen(9000, () => {
  console.log(" Authenticationproviders Server started");
});
