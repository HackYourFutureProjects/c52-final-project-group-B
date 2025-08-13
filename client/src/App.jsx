import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home/Home";
import DeckPage from "@/pages/DeckPage";
import CreateDeck from "@/pages/CreateDeck";
import CardMode from "@/pages/CardMode";
import NotFound from "@/pages/NotFound/NotFoundPage";
import UserProfile from "@/pages/User/UserProfile";
import BrowseDecks from "@/pages/BrowseDecks";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/users/me" element={<UserProfile />} />
      <Route path="/profile" element={<Navigate to="/users/me" replace />} />

      <Route path="/deck/:id" element={<DeckPage />} />
      <Route path="/deck/create" element={<CreateDeck />} />
      <Route path="/deck/edit/:id" element={<CreateDeck />} />
      <Route path="/deck/:id/card-mode" element={<CardMode />} />

      <Route path="/browse" element={<BrowseDecks />} />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
