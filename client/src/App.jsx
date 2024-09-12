import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import NoPage from "./components/NoPage";
import Logout from "./components/Logout";
import OpinionPage  from "./components/opinion/OpinionPage"
import ProtectedAccordion from "./components/ProtectedAccordion";


import { UserProvider } from "./context/UserContext";
import { Routes, Route } from "react-router-dom";
import "./App.css";
ProtectedAccordion

function App() {
  return (
    <UserProvider>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/protectedAccordion" element={<ProtectedAccordion />} />
          <Route path="/opinion" element={<OpinionPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </main>

      <Footer />
    </UserProvider>
  );
}

export default App;
