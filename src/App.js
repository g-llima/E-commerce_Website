import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "react-use-cart";

import Navbar from "./components/Navbar/Navbar.js";
import HomePage from "./pages/HomePage.js";
import SuccesBuy from "./pages/SuccessBuy";
import "./App.css";

function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="/success" element={<SuccesBuy />} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
