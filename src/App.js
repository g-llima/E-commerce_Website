import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import { ProductsContext } from "./ProductsContext.js";

import Navbar from "./components/Navbar/Navbar.js";
import SearchPage from "./pages/SearchPage/SearchPage.js";
import HomePage from "./pages/HomePage.js";
import SuccesBuy from "./pages/SuccessBuy";
import ProductFull from "./pages/ProductFull/ProductFull";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

// FUNCTION TO REMOVE TEXT SPECIAL CHARACTERS
function removeSpecial(str) {
  str = str.replace("ã", "a");
  str = str.replace("ç", "c");
  str = str.replace(/[^a-zA-Z ]/g, "");
  str = str.replace(/\s/g, "-");
  return str;
}

function App() {
  const [contextValue, setContextValue] = useState([]);

  useEffect(async () => {
    await axios.get("/products").then((res) => {
      setContextValue(res.data);
    });
  }, []);

  return (
    <>
      <ProductsContext.Provider value={{ contextValue, setContextValue }}>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="/success" element={<SuccesBuy />} />
            <Route path="/buscar/:s" element={<SearchPage />} />

            {contextValue.map((item, index) => (
              <Route
                key={index}
                path={`/${removeSpecial(item.productName)}`}
                element={<ProductFull product={item} />}
              />
            ))}
          </Routes>
        </CartProvider>
      </ProductsContext.Provider>
    </>
  );
}

export default App;
