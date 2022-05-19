import React from "react";
import "./Card.css";

function Card({
  productImage,
  productName,
  productPrice,
  clickBtn,
  isInCart,
  isPromotion,
  productPriceBefore,
}) {
  return (
    <div className="card">
      <div className={`card__img__container ${isInCart && "card__inCart"}`}>
        <img className="card__img" src={productImage} alt={productName} />
        <button className="card__details__cartBtn" onClick={clickBtn}>
          Olhar
        </button>
      </div>
      <div className="card__details">
        <h4 className="card__details__title">{productName}</h4>
        <div className="card__details__prices">
          {isPromotion && (
            <p className="card__details__prices__priceBefore">
              R$ {productPriceBefore}
            </p>
          )}
          <p className="card__details__prices__price">R$ {productPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
