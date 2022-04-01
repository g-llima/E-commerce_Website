import React from "react";
import Card from "./Card/Card";
import "./Cards.css";
import { useCart } from "react-use-cart";

const products = [
  {
    id: 1,
    productImageLink:
      "https://ih1.redbubble.net/image.3100721225.5642/gpt,mens,750x1000,black,small-pad,750x1000,f8f8f8.u1.jpg",
    productName: "Ultra Masculinity GigaChad Graphic T-Shirt",
    price: 14738,
  },
  {
    id: 2,
    productImageLink:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/products/TechTShirt_Azul-01_df68f358-551d-4b89-aad1-c9ddf13a0356_450x.jpg?v=1647210916",
    productName: "Tech T-Shirt Feminina",
    price: 12900,
  },
  {
    id: 3,
    productImageLink:
      "https://technext.github.io/cozastore/images/product-14.jpg",
    productName: "Pretty Little Thing",
    price: 5479,
  },
];

function convertProductName(str) {
  if (str.length >= 30) {
    return str.substring(0, 30) + "...";
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
