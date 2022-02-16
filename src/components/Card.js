import React from "react";
import "./styles/Card.css";

function Card({
  productImage,
  productName,
  productPrice,
  btnName,
  clickBtn,
  onCart,
}) {
  return (
    <div className="card">
      <img className="card__img" src={productImage} />
      <div className="card__details">
        <h4 className="card__details__product__title">{productName}</h4>
        <p className="card__details__product__price">$ {productPrice}</p>
        <button
          className={`card__details__cartBtn ${onCart ? "card__onCard" : null}`}
          onClick={clickBtn}
        >
          {btnName}
          <i
            className={`${
              onCart ? "fal fa-cart-arrow-down" : "fal fa-cart-plus"
            } card__details__cartBtn__icon`}
          ></i>
        </button>
      </div>
    </div>
  );
}

export default Card;
