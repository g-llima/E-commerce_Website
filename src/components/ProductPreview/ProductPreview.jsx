import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { HashLink as Link } from "react-router-hash-link";

import "./ProductPreview.css";

function covertProductPrice(value) {
  value = value.toString();
  return (
    value.substring(0, value.length - 2) +
    "," +
    value.substring(value.length - 2)
  );
}

function removeSpecial(str) {
  str = str.replace("ã", "a");
  str = str.replace("ç", "c");
  str = str.replace(/[^a-zA-Z ]/g, "");
  str = str.replace(/\s/g, "-");
  return str;
}

function ProductPreview({ product, clickBackground }) {
  const [colorSelected, setColorSelected] = useState(0);
  const [productInput, setProductInput] = useState({ size: "X", color: "X" });
  const [newProduct, setNewProduct] = useState(product);
  const { addItem, inCart } = useCart();

  function buySolo() {
    fetch("http://localhost:5000/payment/solo", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        id: newProduct.product.id,
        quantity: 1,
        price: newProduct.product.price,
        name: newProduct.product.productName,
        imgUrl: newProduct.product.productImageLink,
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

  useEffect(() => {
    setNewProduct({
      ...newProduct,
      productName:
        product.productName +
        " ---" +
        Object.values(productInput.size) +
        "-" +
        Object.values(productInput.color),
    });
  }, [productInput, product]);

  useEffect(() => {
    setProductInput({
      ...productInput,
      ["color"]: Object.keys(newProduct.colors[colorSelected]),
    });
  }, [colorSelected]);

  return (
    <>
      <div className="productPreviewBackground" onClick={clickBackground}></div>
      <div className="productPreview">
        <div className="productPreview__content">
          {/*---------------- PRODUCT IMAGE ------------------*/}
          <div className="productPreview__content__imgs__container">
            <img src={product.productImageLink} alt={product.productName} />
          </div>

          <div className="productPreview__content__body">
            {/*---------------- PRODUCT TITLE ------------------*/}
            <h1 className="productPreview__content__body__title">
              {product.productName}
            </h1>

            {/*---------------- PRODUCT PRICE ------------------*/}
            <p className="productPreview__content__body__price">
              R$ {covertProductPrice(newProduct.price)}
            </p>

            {/*---------------- PRODUCT DESCRIPTION ------------------*/}
            <p className="productPreview__content__body__description">
              {newProduct.productDescription}
            </p>

            <hr className="productPreview__line" />

            {/*---------------- COLORS ------------------*/}
            <div className="productPreview__content__body__colors">
              <p className="productPreview__content__body__colors__text">
                <span>Cor</span>:{" "}
                {Object.keys(newProduct.colors[colorSelected])}
              </p>
              <div className="productPreview__content__body__colors__items">
                {product.colors.map((item, index) =>
                  Object.values(item).map((color) => (
                    <span
                      key={index}
                      className={
                        colorSelected === index
                          ? "productPreview__color__selected"
                          : null
                      }
                      style={{ backgroundColor: color }}
                      onClick={() => setColorSelected(index)}
                    >
                      <i className="fa-solid fa-check"></i>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/*---------------- SIZE & QUANTITY BUTTONS ------------------*/}
            <div className="productPreview__content__body__input__btns">
              {/*---------------- SIZES BUTTON ------------------*/}
              <div className="productPreview__content__body__input__btns__sizes">
                <p>Tamanho: </p>
                <select
                  onChange={(e) =>
                    setProductInput({
                      ...productInput,
                      ["size"]: e.target.value,
                    })
                  }
                >
                  {newProduct.sizes.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/*---------------- QUANTITY BUTTON ------------------*/}
              <div className="productPreview__content__body__input__btns__qnt">
                <i
                  className="fa-solid fa-minus"
                  onClick={() =>
                    newProduct.quantity > 1 &&
                    setNewProduct({
                      ...newProduct,
                      quantity: newProduct.quantity - 1,
                    })
                  }
                ></i>
                {newProduct.quantity}
                <i
                  className="fa-solid fa-plus"
                  onClick={() =>
                    setNewProduct({
                      ...newProduct,
                      quantity: newProduct.quantity + 1,
                    })
                  }
                ></i>
              </div>
            </div>

            <hr className="productPreview__line" />

            {/*---------------- PRODUCT BUY & ADD TO CART BUTTONS ------------------*/}
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
                  if (!inCart(newProduct.id)) {
                    addItem(newProduct, newProduct.quantity);
                    clickBackground();
                  }
                }}
              >
                ADICIONAR NO CARRINHO
              </button>
              <Link to={`/${removeSpecial(product.productName)}`}>
                <button>full page</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPreview;
