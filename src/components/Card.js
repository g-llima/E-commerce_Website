import React from "react";
import "./styles/Card.css";

function Card({
  productImage,
  productName,
  productPrice,
  productType,
  btnName,
  clickBtn,
  onCart,
}) {
  return (
    <div className="card">
      <img className="card__img" src={productImage} alt={productName} />
      <div className="card__details">
        <h4 className="card__details__title">{productName}</h4>
        <button className="card__details__title__type">{productType}</button>
        <p className="card__details__price">$ {productPrice}</p>
        <button
          className={`card__details__cartBtn ${onCart ? "card__onCard" : null}`}
          onClick={clickBtn}
        >
          {btnName}
        </button>
      </div>
    </div>
  );
}

export default Card;
