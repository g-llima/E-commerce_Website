import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer">
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
      </div>

      <div className="footest">
        <div className="footest__content">
          <div className="footest__content__information">
            <h4>Ajuda & Informações</h4>
            <ul>
              <li>
                <Link to="#">FAQ</Link>
              </li>
              <li>
                <Link to="#">Privacidade</Link>
              </li>
              <li>
                <Link to="#">Entrega</Link>
              </li>
            </ul>
          </div>

          <div className="footest__content__categories">
            <h4>Categorias</h4>
            <ul>
              <li>
                <Link to="#">CASUAL</Link>
              </li>
              <li>
                <Link to="#">ESPORTIVA</Link>
              </li>
              <li>
                <Link to="#">ACESSÓRIOS</Link>
              </li>
              <li>
                <Link to="#">PROMOÇÃO</Link>
              </li>
            </ul>
          </div>

          <div className="footest__content__social">
            <h4>SOCIAL</h4>
            <div className="footest__content__social__icons">
              <Link to="#">
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-facebook"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-pinterest"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-youtube"></i>
              </Link>
            </div>
          </div>
        </div>
        <p className="footest__copy">
          Copyright &copy;, Todos os direitos reservados - 2022
        </p>
      </div>
    </footer>
  );
}

export default Footer;
