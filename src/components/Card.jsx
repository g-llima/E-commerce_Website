import React from "react";
import "./styles/Card.css";

function Card({
  productImage,
  productName,
  productPrice,
  productDescription,
  addClick,
}) {
  return (
    <div className="card">
      <img className="card__img" src={productImage} />
      <div className="card__details">
        <div className="card__details__product">
          <h4 className="card__details__product__title">{productName}</h4>
          <p className="card__details__product__price">{productPrice}</p>
        </div>
        <p className="card__details__description">{productDescription}</p>
      </div>
      <div className="card__btns">
        <i className="fal fa-cart-plus addCartBtn" onClick={addClick}></i>
      </div>
    </div>
  );
}

export default Card;
