import React from "react";

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
                <span
                  className="productPreview__color__selected"
                  style={{ backgroundColor: "#14140F" }}
                >
                  <i className="fa-solid fa-check"></i>
                </span>
                <span style={{ backgroundColor: "#053D38" }}></span>
                <span style={{ backgroundColor: "#F26800" }}></span>
                <span style={{ backgroundColor: "crimson" }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPreview;
