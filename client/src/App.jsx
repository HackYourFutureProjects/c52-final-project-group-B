import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import CreateUser from "@/pages/User/CreateUser";
import UserList from "@/pages/User/UserList";
import DeckPage from "@/pages/DeckPage";
import CreateDeck from "@/pages/CreateDeck";
import CardMode from "@/pages/CardMode";
import NotFound from "@/pages/NotFound/NotFoundPage";
import UserProfile from "@/pages/User/UserProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/user" element={<UserList />} />
      <Route path="/users/:id" element={<UserProfile />} />
      <Route path="/user/create" element={<CreateUser />} />

      <Route path="/deck/:id" element={<DeckPage />} />
      <Route path="/deck/create" element={<CreateDeck />} />
      <Route path="/deck/edit/:id" element={<CreateDeck />} />
      <Route path="/deck/:id/card-mode" element={<CardMode />} />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
