import Deck from "../models/Deck";
import { Request, Response } from "express";

export const getDecksController = async (req: Request, res: Response) => {
  const allDecks = await Deck.find();
  res.json(allDecks);
};

export const createDeckController = async (req: Request, res: Response) => {
  const { title } = req.body;
  const newDeck = new Deck({
    title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
};

export const deleteDeckController = async (req: Request, res: Response) => {
  // get the deck id from the url
  const deckId = req.params.deckId;

  // delete the deck from the db
  const deletedDeck = await Deck.findByIdAndDelete(deckId);

  // return the deleted deck to the user
  res.json(deletedDeck);
};

export const getDeckController = async (req: Request, res: Response) => {
  const { deckId } = req.params;
  const deck = await Deck.findById(deckId);
  res.json(deck);
};

export const createCardController = async (req: Request, res: Response) => {
  // get the deck id from the url
  const deckId = req.params.deckId;

  // get the deck from mongo
  const deck = await Deck.findById(deckId);

  // check if a deck exists
  if (!deck) {
    return res.status(404).json({ error: "deck not found" });
  }

  // get the card text from the request body
  const { text } = req.body;

  // push the text in the cards array
  deck.cards.push(text);

  // save the deck to the db
  await deck.save();

  // send back the response
  res.json(deck);
};

export const deleteCardController = async (req: Request, res: Response) => {
  // get the deck id from the url
  const deckId = req.params.deckId;

  //   get card id
  const index = req.params.index;

  // get the deck from mongo
  const deck = await Deck.findById(deckId);

  // check if a deck exists
  if (!deck) {
    return res.status(404).json({ error: "deck not found" });
  }

  deck.cards.splice(parseInt(index), 1);

  await deck.save();

  res.json(deck);
};
