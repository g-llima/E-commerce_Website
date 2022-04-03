import React, { useState } from "react";
import { useCart } from "react-use-cart";

import "./ProductPreview.css";

function covertProductPrice(value) {
  value = value.toString();
  return (
    value.substring(0, value.length - 2) +
    "," +
    value.substring(value.length - 2)
  );
}
function convertProductName(str) {
  if (str.length >= 30) {
    return 48 - (str.length - 30) + "px";
  }
  return 48 + "px";
}

function ProductPreview({ product, clickBackground }) {
  const [colorSelected, setColorSelected] = useState(0);

  const { addItem, inCart } = useCart();

  function buySolo() {
    fetch("http://localhost:5000/payment/solo", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        id: product.id,
        quantity: 1,
        price: product.price,
        name: product.productName,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((error) => {
        console.log("Error ", error.error);
      });
  }

  return (
    <>
      <div className="productPreviewBackground" onClick={clickBackground}></div>
      <div className="productPreview">
        <div className="productPreview__content">
          <div className="productPreview__content__imgs__container">
            <img src={product.productImageLink} alt={product.productName} />
          </div>

          <div className="productPreview__content__body">
            <h1
              className="productPreview__content__body__title"
              style={{ fontSize: convertProductName(product.productName) }}
            >
              {product.productName}
            </h1>

            <p className="productPreview__content__body__price">
              R$ {covertProductPrice(product.price)}
            </p>

            <p className="productPreview__content__body__description">
              {product.productDescription}
            </p>

            <hr className="productPreview__line" />

            <div className="productPreview__content__body__colors">
              <p>Cor:</p>
              <div className="productPreview__content__body__colors__items">
                {product.colors.map((item, index) => (
                  <span
                    key={index}
                    className={
                      colorSelected === index
                        ? "productPreview__color__selected"
                        : null
                    }
                    style={{ backgroundColor: item }}
                    onClick={() => setColorSelected(index)}
                  >
                    <i className="fa-solid fa-check"></i>
                  </span>
                ))}
              </div>
            </div>

            <hr className="productPreview__line" />

            <div className="productPreview__content__body__buttons">
              <button
                className="productPreview__content__body__buttons__buy"
                onClick={() => buySolo()}
              >
                COMPRAR
              </button>
              <button
                className="productPreview__content__body__buttons__addCart"
                onClick={() => {
                  if (!inCart(product.id)) {
                    addItem(product);
                    clickBackground();
                  }
                }}
              >
                ADICIONAR NO CARRINHO
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPreview;
