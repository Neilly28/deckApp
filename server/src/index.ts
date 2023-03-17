require("dotenv").config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";
import cors from "cors";
import {
  createDeckController,
  getDecksController,
  deleteDeckController,
  createCardController,
  getDeckController,
  deleteCardController,
} from "./controllers/deckController";

const app = express();

app.use(cors());
app.use(express.json());

// message for server
// app.get("/decks", (req, res) => {
//   res.send("hello world");
// });

//get all decks
app.get("/decks", getDecksController);

// create new Deck
app.post("/decks", createDeckController);

// delete a Deck
app.delete("/decks/:deckId", deleteDeckController);

// get single deck
app.get("/decks/:deckId", getDeckController);

// create card for deck
app.post("/decks/:deckId/cards", createCardController);

// delete card
app.delete("/decks/:deckId/cards/:index", deleteCardController);

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
