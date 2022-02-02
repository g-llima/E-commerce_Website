import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import Card from "./Card";
import "./styles/Cards.css";

const products = [
  {
    id: 1,
    productImageLink:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000",
    productName: "Apple Macbook",
    productPrice: "$99",
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    productImageLink:
      "https://cb.scene7.com/is/image/Crate/RussellHazelInDueTimeNotesSHF18/$web_pdp_main_carousel_med$/190411135412/russel-hazel-in-due-time-gold-notepad-set.jpg",
    productName: "Russel + Hazel In Due Time Gold Notepad Set",
    productPrice: "$20",
    productDesc:
      "Clear Away The Clutter And Get Organized With Desk Accessories That Are Fresh Looking, Sophisticated And Super Functional.",
  },
];

function Cards() {
  const [cart, setCart] = useState([]);
  const { setCartLength } = useContext(CartContext);

  console.log(cart);

  const addToCart = (product) => {
    setCart([...cart, { ...product }]);
    setCartLength(cart.length + 1);
  };

  return (
    <div className="cards">
      {products.map((item, key) => (
        <Card
          key={key}
          id={item.id}
          productImage={item.productImageLink}
          productName={item.productName}
          productPrice={item.productPrice}
          productDescription={item.productDesc}
          addClick={() => addToCart(item)}
        />
      ))}
    </div>
  );
}

export default Cards;
