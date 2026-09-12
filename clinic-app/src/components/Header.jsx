import Heart from "../assets/images/Heart.svg";
import ShieldCheck from "../assets/images/ShieldCheck.png";
import Clock from "../assets/images/Clock.png";
import { Link } from "react-router-dom";

import "./Header.css";
const Header = () => {
  return (
    <section className="header">
        <div className="header-content">
            <h1>Votre santé,<br/>notre priorité</h1>
            <p>Prenez rendez-vous en quelques clics</p>
            <div className="actions">
              <Link to="/sign-up">
                <button className="rendez-btn"> Prendre rendez-vous</button>
              </Link>
                <button className="nos-services">Nos Services</button>
            </div>
        </div>
        <div className="header-visual">
  <div className="visual-container">
    <div className="main-icon-wrapper">
      <img src={Heart} alt="Heart" className="heart-icon" />
    </div>
    
    <div className="floating-badge badge-top">
      <div className="badge-icon green">
        <img src={ShieldCheck} alt="Shield" />
      </div>
      <div className="badge-text">
        <strong>100% Sécurisé</strong>
        <span>Données protégées</span>
      </div>
    </div>

    <div className="floating-badge badge-bottom">
      <div className="badge-icon blue">
        <img src={Clock} alt="Clock" />
      </div>
      <div className="badge-text">
        <strong>24/7 Disponible</strong>
        <span>Réservation en ligne</span>
      </div>
    </div>
  </div>
</div>
        
    </section>
  )
};export default Header