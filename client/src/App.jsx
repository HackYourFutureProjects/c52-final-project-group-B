import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home/Home";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Terms from "@/pages/Terms";
import DeckPage from "@/pages/DeckPage";
import CreateDeck from "@/pages/CreateDeck";
import CardMode from "@/pages/CardMode";
import NotFound from "@/pages/NotFound/NotFoundPage";
import UserProfile from "@/pages/User/UserProfile";
import ResetPasswordPage from "@/pages/Auth/ResetPasswordPage";
import BrowseDecks from "@/pages/BrowseDecks";
import { ROUTES } from "@/routes/paths";
import Support from "@/pages/Support";

const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.TERMS} element={<Terms />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/support" element={<Support />} />
      <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
      <Route
        path={ROUTES.PROFILE}
        element={<Navigate to={ROUTES.USER_PROFILE} replace />}
      />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />

      <Route path={ROUTES.DECKS} element={<BrowseDecks />} />
      <Route path={ROUTES.DECK_CREATE} element={<CreateDeck />} />
      <Route path={ROUTES.DECKS + "/:id"} element={<DeckPage />} />
      <Route path={ROUTES.DECKS + "/:id/edit"} element={<CreateDeck />} />
      <Route path={ROUTES.DECKS + "/:id/card-mode"} element={<CardMode />} />
      <Route path={ROUTES.FAQ} element={<FAQ />} />

      <Route path={ROUTES.BROWSE} element={<BrowseDecks />} />

      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
