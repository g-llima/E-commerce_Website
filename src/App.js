import React from "react";
import { CartProvider } from "react-use-cart";
import Cards from "./components/Cards.js";
import Navbar from "./components/Navbar.js";
import "./App.css";

function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Cards />
      </CartProvider>
    </>
  );
}

export default App;
