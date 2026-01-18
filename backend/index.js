require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://nebs-it-task-client.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect(); 

    const db = client.db("gadgetSwapDB");
    const productsCollection = db.collection("products");

    // add or post product
    app.post("/items", async (req, res) => {
      try {
        const productInfo = req.body;

        if (!productInfo.name || !productInfo.price) {
          return res
            .status(400)
            .send({ message: "Product name and price are required" });
        }

        const result = await productsCollection.insertOne(productInfo);
        res.status(201).send(result);
      } catch (error) {
        console.error("Post error:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

   

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to GadgetSwap!");
});

app.listen(port, () => {
  console.log(`GadgetSwap app listening on port ${port}`);
});
