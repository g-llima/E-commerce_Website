import React from "react";
import Card from "./Card";
import "./styles/Cards.css";

const products = [
  {
    productImageLink:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000",
    productName: "Apple Macbook",
    productPrice: "$99",
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

function Cards() {
  return (
    <div className="cards">
      {products.map((item, key) => (
        <Card
          key={key}
          productImage={item.productImageLink}
          productName={item.productName}
          productPrice={item.productPrice}
          productDescription={item.productDesc}
        />
      ))}
    </div>
  );
}

export default Cards;
