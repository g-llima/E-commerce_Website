import React from "react";
import Card from "./Card/Card";
import "./Cards.css";
import { useCart } from "react-use-cart";

const products = [
  {
    id: 1,
    productImageLink:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000",
    productName: "Apple Macbook",
    productType: "TECHNOLOGY",
    price: 9900,
  },
  {
    id: 2,
    productImageLink:
      "https://images-na.ssl-images-amazon.com/images/I/61+zywn98LL._SX798_BO1,204,203,200_.jpg",
    productName: "Star Wars Art: Ralph McQuarrie Capa dura – Ilustrado",
    productType: "BOOKS",
    price: 131573,
  },
];

function convertProductName(str) {
  if (str.length >= 41) {
    return str.substring(0, 41) + "...";
  }
  return str;
}
function covertProductPrice(value) {
  value = value.toString();
  return (
    value.substring(0, value.length - 2) +
    "," +
    value.substring(value.length - 2)
  );
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
          productPrice={covertProductPrice(item.price)}
          productType={item.productType}
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
