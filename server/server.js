import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postsRouter from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();

app.use("/posts", postsRouter);

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@cluster0.thms6.mongodb.net/postsApp?retryWrites=true&w=majority`;

//Db connection
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Mongodb connected successfully!");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("server");
});
