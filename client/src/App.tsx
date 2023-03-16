import { useEffect, useState } from "react";

function App() {
  const [decks, setDecks] = useState([]);
  const [title, setTitle] = useState("");

  // create new deck
  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
    setTitle("");
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

  return (
    <div className="flex flex-col justify-center items-center max-w-3xl mx-auto p-8 bg-yellow-200">
      <h1 className="text-center text-4xl font-bold mb-12 text-slate-700">
        Welcome to DeckApp
      </h1>

      <ul className="grid grid-cols-3 gap-4 text-xl mb-4">
        {decks.map((deck) => (
          <li
            key={deck._id}
            className="flex justify-center items-center shadow-md p-4 rounded-lg bg-white text-slate-700 text-base font-bold text-center h-24"
          >
            {deck.title}
          </li>
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

export default App;
