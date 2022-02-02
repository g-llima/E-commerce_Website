import React from "react";
import Card from "./Card";
import "./styles/Cards.css";
import { useCart } from "react-use-cart";

const products = [
  {
    id: 1,
    productImageLink:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000",
    productName: "Apple Macbook",
    price: 99,
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    productImageLink:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000",
    productName: "Apple Macbook2",
    price: 19,
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

function Cards() {
  const [isOnCart, setIsOnCart] = React.useState(new Set());
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    addItem,
  } = useCart();

  return (
    <div className="cards">
      {products.map((item, key) => (
        <Card
          key={key}
          productImage={item.productImageLink}
          productName={item.productName}
          productPrice={item.price}
          productDescription={item.productDesc}
          btnName={isOnCart.has(key) ? "Remove from Cart" : "Add to Cart"}
          clickBtn={() => {
            const newIndices = new Set(isOnCart);
            if (isOnCart.has(key)) {
              newIndices.delete(key);
              removeItem(item.id);
            } else {
              newIndices.add(key);
              addItem(item);
            }
            setIsOnCart(newIndices);
          }}
        />
      ))}
    </div>
  );
}

export default Cards;
