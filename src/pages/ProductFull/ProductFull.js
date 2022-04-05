import React from "react";

import "./ProductFull.css";

function ProductFull() {
  return (
    <div className="productFull">
      <div className="productFull__content">
        <div className="productFull__content__img">
          <img
            src="https://cdn.shopify.com/s/files/1/0526/4123/5093/products/TechTShirt_Azul-01_df68f358-551d-4b89-aad1-c9ddf13a0356_450x.jpg?v=1647210916"
            alt="a"
          />
        </div>
        <div className="productFull__content__texts">
          <h1 className="productFull__content__texts__title">
            Ultra-Masculinity-GigaChad-Graphic-TShirt
          </h1>

          <h2 className="productFull__content__texts__title__price">
            R$ 999,00
          </h2>

          <div className="productFull__content__texts__colors">
            <p className="productFull__content__texts__colors__text">
              Cor: <span>Crimson</span>
            </p>
            <div className="productFull__content__texts__colors__items">
              <span
                className="productFull__content__texts__colors__items__btn"
                style={{ backgroundColor: "red" }}
              ></span>
              <span
                className="productFull__content__texts__colors__items__btn"
                style={{ backgroundColor: "green" }}
              ></span>
              <span
                className="productFull__content__texts__colors__items__btn"
                style={{ backgroundColor: "blue" }}
              ></span>
            </div>
          </div>

          <div className="productFull__content__texts__buttons">
            <div className="productFull__content__texts__buttons__size">
              <p>Tamanho: </p>
              <select>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
              </select>
            </div>

            <div className="productFull__content__texts__buttons__qnt">
              <i className="fa-solid fa-minus"></i>1
              <i className="fa-solid fa-plus"></i>
            </div>

            <button className="productFull__content__texts__buttons__addCartBTN">
              ADICIONAR AO <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>

          <div className="productFull__content__texts__description">
            <h4 className="productFull__content__texts__description__title">
              DESCRIÇÃO
            </h4>
            <p className="productFull__content__texts__description__text">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="productFull__content__texts__share">
            <h4>COMPARTILHE</h4>
            <div className="productFull__content__texts__share__icons">
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-whatsapp"></i>
              <i className="fa-brands fa-pinterest-p"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFull;
