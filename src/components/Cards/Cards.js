import React, { useState, useContext, useEffect } from "react";

import Card from "./Card/Card";
import Skeleton from "../Skeleton/Skeleton.jsx";
import Glow from "../Skeleton/Glow/Glow.jsx";

import "./Cards.css";
import { useCart } from "react-use-cart";
import ProductPreview from "../ProductPreview/ProductPreview";
import { ProductsContext } from "../../ProductsContext";

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
  const [products, setProducts] = useState([]);
  const { inCart } = useCart();
  const [isOpenPreview, setIsOpenPreview] = useState(-1);
  const { contextValue } = useContext(ProductsContext);

  let tempProducts = [];

  useEffect(() => {
    setTimeout(() => {
      contextValue.map((item) => {
        tempProducts.push(item);
      });
      setProducts(tempProducts);
    }, 5000);
  }, [contextValue]);

  return (
    <div className="cards">
      {products.length == 0 &&
        [...Array(3)].map((x, i) => (
          <div key={i} className="cards__skel__container">
            <div>
              <Skeleton type="thumbnail" />
              <Skeleton type="text" />
              <Skeleton type="title" />
            </div>
            <Glow />
          </div>
        ))}
      {products.map((item, key) => (
        <div key={key}>
          <Card
            productImage={item.productImageLink}
            productName={convertProductName(item.productName)}
            productPrice={covertProductPrice(item.price)}
            productType={item.productType}
            productDescription={item.productDesc}
            btnName={inCart(item.id) ? "Remove from Cart" : "Add to Cart"}
            onCart={inCart(item.id)}
            colors={item.colors}
            isInCart={inCart(item.id)}
            clickBtn={() =>
              isOpenPreview === key
                ? setIsOpenPreview(-1)
                : setIsOpenPreview(key)
            }
          />
          {isOpenPreview === key && (
            <ProductPreview
              product={item}
              clickBackground={() => setIsOpenPreview(-1)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Cards;
