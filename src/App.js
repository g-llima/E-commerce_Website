import React, { useState } from "react";
import Cards from "./components/Cards.jsx";
import Navbar from "./components/Navbar.jsx";
import "./App.css";
import { CartContext } from "./Context/CartContext.js";

function App() {
  const [cartLength, setCartLength] = useState(0);

  return (
    <div className="App">
      <CartContext.Provider value={{ cartLength, setCartLength }}>
        <Navbar />
        <Cards />
      </CartContext.Provider>
    </div>
  );
}

export default App;
