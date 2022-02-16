import React, { useState } from "react";
import Card from "./Card";
import "./styles/Cards.css";
import { useCart } from "react-use-cart";

const products = [
  {
    id: 1,
    productImageLink:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000",
    productName: "Apple Macbook",
    price: 9900,
  },
  {
    id: 2,
    productImageLink:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000",
    productName: "Elegant designed coffee plant for desktop and mac",
    price: 1900,
  },
];

function convertProductName(str) {
  if (str.length >= 41) {
    return str.substring(0, 41) + "...";
  }
  return str;
}

function Cards() {
  const { addItem, removeItem, inCart } = useCart();

  return (
    <div className="cards">
      {products.map((item, key) => (
        <Card
          key={key}
          productImage={item.productImageLink}
          productName={convertProductName(item.productName)}
          productPrice={item.price}
          productDescription={item.productDesc}
          btnName={inCart(item.id) ? "Remove from Cart" : "Add to Cart"}
          onCart={inCart(item.id)}
          clickBtn={() => {
            inCart(item.id) ? removeItem(item.id) : addItem(item);
          }}
        />
      ))}
    </div>
  );
}

export default Cards;
