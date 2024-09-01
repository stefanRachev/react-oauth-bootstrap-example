//import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import NoPage from "./components/NoPage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
