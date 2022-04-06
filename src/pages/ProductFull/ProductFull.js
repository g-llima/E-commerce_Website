import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useCart } from "react-use-cart";

import "./ProductFull.css";

function covertProductPrice(value) {
  value = value.toString();
  return (
    value.substring(0, value.length - 2) +
    "," +
    value.substring(value.length - 2)
  );
}

function ProductFull(product) {
  const [newProduct, setNewProduct] = useState(product);
  const [colorSelected, setColorSelected] = useState(0);
  const { addItem, removeItem, inCart } = useCart();

  return (
    <div className="productFull">
      <div className="productFull__content">
        {/*---------------- PRODUCT IMAGE ------------------*/}
        <div className="productFull__content__img">
          <img
            src={product.product.productImageLink}
            alt={product.productName}
          />
        </div>
        <div className="productFull__content__texts">
          {/*---------------- TITLE ------------------*/}
          <h1 className="productFull__content__texts__title">
            {product.product.productName}
          </h1>

          {/*---------------- PRICE ------------------*/}
          <h2 className="productFull__content__texts__title__price">
            R$ {covertProductPrice(product.product.price)}
          </h2>

          {/*---------------- COLORS ------------------*/}
          <div className="productFull__content__texts__colors">
            <p className="productFull__content__texts__colors__text">
              <span>Cor</span>:{" "}
              {Object.keys(product.product.colors[colorSelected])}
            </p>
            <div className="productFull__content__texts__colors__items">
              {product.product.colors.map((item, index) =>
                Object.values(item).map((color) => (
                  <span
                    key={index}
                    className={
                      colorSelected === index
                        ? "productFull__color__selected"
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

          {/*---------------- MIDDLE BUTTONS ------------------*/}
          <div className="productFull__content__texts__buttons">
            <div className="productFull__content__texts__buttons__size">
              <p>Tamanho: </p>
              <select
                onChange={(e) =>
                  setNewProduct({
                    product: {
                      ...newProduct.product,
                      productName:
                        product.product.productName + " - " + e.target.value,
                    },
                  })
                }
              >
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
              </select>
            </div>

            {/*---------------- QUANTITY BUTTON ------------------*/}
            <div className="productFull__content__texts__buttons__qnt">
              <i
                className="fa-solid fa-minus"
                onClick={() =>
                  newProduct.product.quantity > 1 &&
                  setNewProduct({
                    product: {
                      ...newProduct.product,
                      quantity: newProduct.product.quantity - 1,
                    },
                  })
                }
              ></i>
              {newProduct.product.quantity}
              <i
                className="fa-solid fa-plus"
                onClick={() =>
                  setNewProduct({
                    product: {
                      ...newProduct.product,
                      quantity: newProduct.product.quantity + 1,
                    },
                  })
                }
              ></i>
            </div>

            {/*---------------- ADD TO CART BUTTON ------------------*/}
            <button
              className={`productFull__content__texts__buttons__addCartBTN ${
                inCart(newProduct.product.id) && "ProductFull_Btn_InCart"
              }`}
              onClick={() =>
                !inCart(newProduct.product.id)
                  ? addItem(newProduct.product, newProduct.product.quantity)
                  : removeItem(newProduct.product.id)
              }
            >
              <p
                className={
                  inCart(newProduct.product.id)
                    ? "ProductFull_InCart"
                    : "productFull_NotCart"
                }
              >
                ADICIONAR NO
              </p>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>

          {/*---------------- PRODUCT DESCRIPTION ------------------*/}
          <div className="productFull__content__texts__description">
            <h4 className="productFull__content__texts__description__title">
              DESCRIÇÃO
            </h4>
            <p className="productFull__content__texts__description__text">
              {product.product.productDescription}
            </p>
          </div>

          {/*---------------- SHARE PRODUCT ------------------*/}
          <div className="productFull__content__texts__share">
            <h4>COMPARTILHE</h4>
            <div className="productFull__content__texts__share__icons">
              <Link to="/">
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link to="/">
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link to="/">
                <i className="fa-brands fa-whatsapp"></i>
              </Link>
              <Link to="/">
                <i className="fa-brands fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFull;
