require("dotenv").config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// message for server
// app.get("/decks", (req, res) => {
//   res.send("hello world");
// });

//get all decks
app.get("/decks", async (req: Request, res: Response) => {
  const allDecks = await Deck.find();
  res.json(allDecks);
});

// create new Deck
app.post("/decks", async (req: Request, res: Response) => {
  const { title } = req.body;
  const newDeck = new Deck({
    title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

// delete a Deck
app.delete("/decks/:deckId", async (req: Request, res: Response) => {
  // get the deck id from the url
  const deckId = req.params.deckId;

  // delete the deck from the db
  const deletedDeck = await Deck.findByIdAndDelete(deckId);

  // return the deleted deck to the user
  res.json(deletedDeck);
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
