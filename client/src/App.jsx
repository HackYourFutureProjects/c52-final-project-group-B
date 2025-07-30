import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import CreateUser from "@/pages/User/CreateUser";
import UserList from "@/pages/User/UserList";
import DeckPage from "@/pages/Deck";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<UserList />} />
      <Route path="/user/create" element={<CreateUser />} />
      <Route path="/deck/:id" element={<DeckPage />} />
    </Routes>
  );
};

export default App;
