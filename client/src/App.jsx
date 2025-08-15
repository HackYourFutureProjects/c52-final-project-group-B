import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home/Home";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Terms from "@/pages/Terms";
import DeckPage from "@/pages/DeckPage";
import CreateDeck from "@/pages/CreateDeck";
import EditDeck from "@/pages/EditDeck";
import CardMode from "@/pages/CardMode";
import NotFound from "@/pages/NotFound/NotFoundPage";
import UserProfile from "@/pages/User/UserProfile";
import ResetPasswordPage from "@/pages/Auth/ResetPasswordPage";
import BrowseDecks from "@/pages/BrowseDecks";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />

      <Route path="/users/me" element={<UserProfile />} />
      <Route path="/profile" element={<Navigate to="/users/me" replace />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route path="/deck/:id" element={<DeckPage />} />
      <Route path="/deck/create" element={<CreateDeck />} />
      <Route path="/deck/:id/edit" element={<EditDeck />} />
      <Route path="/deck/:id/card-mode" element={<CardMode />} />
      <Route path="/faq" element={<FAQ />} />

      <Route path="/browse" element={<BrowseDecks />} />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
