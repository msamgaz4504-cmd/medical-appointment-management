import "./ReservationSection.css";
import exclamation from '../assets/images/exclamation.png';
import un from '../assets/images/un.png';
import deux from '../assets/images/deux.png';
import trois from '../assets/images/trois.png';
import { Link } from "react-router-dom";


const ReservationSection = () => {
  return (
    <section className="reservation-section" id="horaires">
      <div className="reservation-section-container">
        <div className="horaires">
          <h1>Horaires d'ouverture</h1>
          <div className="horaires-list">
              <div className="horaires-content">
                <p className="horaire-right">Lundi - Vendredi</p>
                <p className="horaire-left" style={{color: "#2563eb"}}>09:00 - 19:00</p>
              </div>
              <div className="horaires-content">
                <p className="horaire-right">Samedi</p>
                <p className="horaire-left" style={{color: "#2563eb"}}>09:00 - 13:00</p>
              </div>
              <div className="horaires-content">
                <p className="horaire-right">Dimanche</p>
                <p className="horaire-left" style={{color: "red"}}>Fermé</p>
              </div>
          </div>
          <div className="horaire-urgent">
            <img src={exclamation} alt="Urgence"/>
            <p>Urgences médicales disponibles 24h/24 au&nbsp;<b> 01 45 67 89 00</b></p>
          </div>
        </div>
        <div className="processus-reservation">
          <h1>Réservez maintenant</h1>
          <div className="processus-list">
            <div className="processus">
              <img src={un} alt="un"/>
              <div className="processus-text">
                <h4>Choisissez une date</h4>
                <p style={{color: "#6e6e6e"}}>Sélectionnez le jour qui vous convient</p>
              </div>
            </div>
            <div className="processus">
              <img src={deux} alt="deux"/>
              <div className="processus-text">
                <h4>Sélectionnez un créneau</h4>
                <p style={{color: "#6e6e6e"}}>Choisissez parmi les disponibilités</p>
              </div>
            </div>
            <div className="processus">
              <img src={trois} alt="trois"/>
              <div className="processus-text">
                <h4>Confirmez</h4>
                <p style={{color: "#6e6e6e"}}>Recevez votre confirmation par email</p>
              </div>
            </div>
          </div>
          <Link to = "/reservation">
          <button className="reservation-btn"><b>Prendre rendez-vous</b></button>
          </Link>
        
          </div>
        </div>
      
    </section>
  )
};export default ReservationSection