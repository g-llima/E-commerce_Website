import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import { ProductsContext } from "./ProductsContext.js";

import Navbar from "./components/Navbar/Navbar.js";
import HomePage from "./pages/HomePage.js";
import SuccesBuy from "./pages/SuccessBuy";
import "./App.css";

const products = [
  {
    id: 1,
    productImageLink:
      "https://ih1.redbubble.net/image.3100721225.5642/gpt,mens,750x1000,black,small-pad,750x1000,f8f8f8.u1.jpg",
    productName: "Ultra Masculinity GigaChad Graphic T-Shirt",
    colors: ["#14140F", "#053D38", "#F26800", "crimson"],
    productDescription:
      "1At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate nonprovident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    price: 14738,
  },
  {
    id: 2,
    productImageLink:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/products/TechTShirt_Azul-01_df68f358-551d-4b89-aad1-c9ddf13a0356_450x.jpg?v=1647210916",
    productName: "Tech T-Shirt Feminina",
    colors: ["#14140F"],
    productDescription:
      "2At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate nonprovident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    price: 12900,
  },
  {
    id: 3,
    productImageLink:
      "https://technext.github.io/cozastore/images/product-14.jpg",
    productName: "Pretty Little Thing",
    colors: ["#14140F", "crimson"],
    productDescription:
      "3At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate nonprovident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    price: 5479,
  },
];

function App() {
  const [contextValue, setContextValue] = useState(products);

  return (
    <>
      <ProductsContext.Provider value={{ contextValue, setContextValue }}>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="/success" element={<SuccesBuy />} />
          </Routes>
        </CartProvider>
      </ProductsContext.Provider>
    </>
  );
}

export default App;
