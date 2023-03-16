require("dotenv").config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";

const app = express();

app.use(express.json());

// create new Deck
app.post("/decks", async (req: Request, res: Response) => {
  const { title } = req.body;
  const newDeck = new Deck({
    title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

// connect to db
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    // listen for requests
    app.listen(5000, () => {
      console.log("connected to db & listening from port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
