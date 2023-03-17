import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

type TDeck = {
  title: string;
  _id: string;
};

export default function Home() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  // create new deck
  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
    setTitle("");
    const newDeck = await response.json();
    setDecks([...decks, newDeck]);
  };

  // fetch all decks
  useEffect(() => {
    const fetchDecks = async () => {
      const response = await fetch("http://localhost:5000/decks");
      const allDecks = await response.json();
      setDecks(allDecks);
    };
    fetchDecks();
  }, []);

  // delete a deck (takes in a parameter which corresponds to deck_.id)
  const handleDeleteDeck = async (deckId: string) => {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: "DELETE",
    });
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-3xl mx-auto p-8 bg-yellow-200">
      <h1 className="text-center text-4xl font-bold mb-12 text-slate-700">
        Welcome to DeckApp
      </h1>

      <ul className="grid grid-cols-3 gap-4 text-xl mb-4">
        {decks.map((deck) => (
          <Link to={`decks/${deck._id}`}>
            <li
              key={deck._id}
              className="flex justify-center items-center shadow-md p-4 rounded-lg bg-white hover:bg-slate-100 transition ease-in-out cursor-pointer text-slate-700 text-base font-bold text-center h-24 relative"
            >
              {deck.title}
              <button
                className="absolute top-1 right-1 w-5 h-5"
                onClick={() => handleDeleteDeck(deck._id)}
              >
                <AiFillCloseCircle className="w-full h-full text-gray-200 hover:text-red-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300" />
              </button>
            </li>
          </Link>
        ))}
      </ul>

      <form className="flex flex-col" onSubmit={handleCreateDeck}>
        {/* <label htmlFor="deck-title">Deck Title</label> */}
        <input
          className="mb-4 p-4 rounded-lg shadow-md"
          type="text"
          id="deck-title"
          placeholder="Deck Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-sm font-bold uppercase text-white px-4 py-1 rounded-lg">
          Create Deck
        </button>
      </form>
    </div>
  );
}
