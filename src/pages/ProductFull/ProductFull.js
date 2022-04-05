import React from "react";

function ProductFull() {
  return (
    <div className="productFull">
      <div className="productFull__content">
        <div className="productFull__content__img">
          <img
            src="https://ih1.redbubble.net/image.3100721225.5642/gpt,mens,750x1000,black,small-pad,750x1000,f8f8f8.u1.jpg"
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

          <p className="productFull__content__texts__color">
            Cor: <span>Crimson</span>
            <span
              className="productFull__content__texts__color__btn"
              style={{ backgroundColor: "red" }}
            ></span>
            <span
              className="productFull__content__texts__color__btn"
              style={{ backgroundColor: "green" }}
            ></span>
            <span
              className="productFull__content__texts__color__btn"
              style={{ backgroundColor: "blue" }}
            ></span>
          </p>

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
              ADICIONAR NO CARRINHO
            </button>
          </div>

          <div className="productFull__content__texts__description">
            <h4>DESCRIÇÃO</h4>
            <p>
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
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-whatsapp"></i>
            <i className="fa-brands fa-pinterest-p"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFull;
