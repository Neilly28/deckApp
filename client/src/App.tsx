import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Deck from "./pages/Deck";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decks/:deckId" element={<Deck />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
