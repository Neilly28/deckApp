import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { createCard } from "../api/createCard";
import { createDeck } from "../api/createDeck";
import { deleteDeck } from "../api/deleteDeck";
import { getDecks, TDeck } from "../api/getDecks";
import { useParams } from "react-router-dom";
import { getCards } from "../api/getCards";
import { getDeck } from "../api/getDeck";
import { deleteCard } from "../api/deleteCard";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>(null);
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  const { deckId } = useParams();

  // create new card
  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
    // const { newCard } = await createCard(deckId!, text);
    // setCards([...cards, newCard]);
    // setText("");
  };

  // fetch all cards
  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;
      const deck = await getDeck(deckId);
      setDeck(deck);
      setCards(deck.cards);
    };
    fetchDeck();
  }, [deckId]);

  // delete a card (takes in a parameter which corresponds to deck_.id)
  const handleDeleteCard = async (index: number) => {
    if (!deckId) return;
    const updatedDeck = await deleteCard(deckId, index);
    setCards(updatedDeck.cards);
  };

  return (
    <div className="flex flex-col gap-12 justify-center items-center max-w-3xl mx-auto p-8 bg-yellow-200 h-screen">
      <Link to="/" className="flex justify-center items-center mt-24 mx-auto">
        <div className="text-slate-600 w-6 h-6">
          <RiArrowGoBackFill className="w-full h-full" />
        </div>
        <h2 className="px-4 py-2 text-lg font-bold text-slate-600">
          Back to All Decks
        </h2>
      </Link>

      <h1 className="text-center text-4xl font-bold text-slate-700">
        {deck?.title}
      </h1>

      {
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 text-xl">
          {cards.map((card, index) => (
            <div className="relative">
              <li
                key={index}
                className="flex justify-center items-center shadow-md p-4 rounded-lg bg-white hover:bg-slate-100 transition ease-in-out cursor-pointer text-slate-700 text-base font-bold text-center h-24"
              >
                {card}
              </li>

              <button
                className="absolute top-1 right-1 w-5 h-5"
                onClick={() => handleDeleteCard(index)}
              >
                <AiFillCloseCircle className="w-full h-full text-gray-200 hover:text-red-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300" />
              </button>
            </div>
          ))}
        </ul>
      }

      <form className="flex flex-col" onSubmit={handleCreateCard}>
        {/* <label htmlFor="deck-title">Deck Title</label> */}
        <input
          className="mb-4 p-4 rounded-lg shadow-md"
          type="text"
          id="deck-title"
          placeholder="Deck Title"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-sm font-bold uppercase text-white px-4 py-1 rounded-lg">
          Create Deck
        </button>
      </form>
    </div>
  );
}
