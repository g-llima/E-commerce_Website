import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import { ProductsContext } from "./ProductsContext.js";

import Navbar from "./components/Navbar/Navbar.js";
import HomePage from "./pages/HomePage.js";
import SuccesBuy from "./pages/SuccessBuy";
import ProductFull from "./pages/ProductFull/ProductFull";
import "./App.css";

const products = [
  {
    id: 1,
    productImageLink:
      "https://ih1.redbubble.net/image.3100721225.5642/gpt,mens,750x1000,black,small-pad,750x1000,f8f8f8.u1.jpg",
    productName: "Ultra Masculinity GigaChad Graphic T-Shirt",
    colors: [{ Preto: "#14140F" }],
    sizes: ["M", "G", "GG"],
    productDescription:
      "1At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate nonprovident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    price: 14738,
    quantity: 1,
  },
  {
    id: 2,
    productImageLink:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/products/TechTShirt_Azul-01_df68f358-551d-4b89-aad1-c9ddf13a0356_450x.jpg?v=1647210916",
    productName: "Tech T-Shirt Feminina",
    colors: [
      { Preto: "#14140F" },
      { "Azul Claro": "#0fbaab" },
      { Vermelho: "#ff3636" },
    ],
    sizes: ["M", "G", "GG", "XG"],
    productDescription:
      "2At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate nonprovident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    price: 12900,
    quantity: 1,
  },
  {
    id: 3,
    productImageLink:
      "https://technext.github.io/cozastore/images/product-14.jpg",
    productName: "Pretty Little Thing",
    colors: [
      { Preto: "#14140F" },
      { "Azul Claro": "#0fbaab" },
      { Laranja: "#F26800" },
      { Vermelho: "#ff3636" },
    ],
    sizes: ["P", "M"],
    productDescription:
      "3At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate nonprovident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    price: 5479,
    quantity: 1,
  },
];

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
