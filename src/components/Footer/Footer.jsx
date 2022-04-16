import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer__content">
        <div className="footer__content__methods">
          <h4>Métodos de pagamento disponíveis</h4>

          <div className="footer__content__methods__cards">
            <i className="fa-brands fa-cc-visa"></i>
            <i className="fa-brands fa-cc-mastercard"></i>
            <i className="fa-brands fa-cc-paypal"></i>
            <i className="fa-brands fa-cc-amazon-pay"></i>
            <i className="fa-brands fa-cc-apple-pay"></i>
          </div>
        </div>

        <a href="https://elaborate-klepon-55beff.netlify.app" target="_blank">
          Portfólio
        </a>

        <div className="footer__content__author">
          <h4>Desenvolvido por </h4>
          <div className="footer__content__author__texts">
            <i className="fa-solid fa-user"></i>
            <p>Gabriel Silva</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
