//import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <>
      <Header />

      <main>
        <Register />
        <Login />
      </main>

      <Footer />
    </>
  );
}

export default App;
