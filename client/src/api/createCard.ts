import { API_URL } from "./config";
import { TDeck } from "./getDecks";

// create new deck
export const createCard = async (
  deckId: string,
  text: string
): Promise<TDeck> => {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });
  return response.json();
};
