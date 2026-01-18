require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://gadget-swap-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Auth Middleware
const verifyUser = (req, res, next) => {
  const sessionHeader = req.headers.authorization; 
  if (!sessionHeader) {
    return res.status(401).send({ message: "Unauthorized! Please login." });
  }
  next();
};

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
    const db = client.db("gadgetSwapDB");
    const productsCollection = db.collection("products");

    app.get("/items", async (req, res) => {
      const result = await productsCollection
        .find()
        .sort({ postedAt: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/items/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productsCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result || { message: "Product not found" });
    });

    app.post("/items", verifyUser, async (req, res) => {
      const result = await productsCollection.insertOne(req.body);
      res.status(201).send(result);
    });

    console.log("MongoDB Connected!");
  } catch (error) {
    console.error(error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to GadgetSwap API!");
});

module.exports = app;

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
