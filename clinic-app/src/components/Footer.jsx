import "./Footer.css";
import logo from '../assets/images/logo.png';


const Footer = () => {
  return (
    <section className="footer-section">
      <div className="footer-container">
        <div className="footer-left">
          <div className="logo">
            <img src={logo} className ="logo-image" alt="Logo"/>
            <h4 className="title">Cabinet Médical Dr. Benani</h4>
          </div>
          <p>Votre santé est notre priorité. Nous offrons des soins de qualité dans un environnement moderne et accueillant. </p>
        </div>
        <div className="footer-medium">
          <h4>Liens rapides</h4>
          <div className="container">
            <ul className="ma-list">
              <li><a href='#nos-services'>Nos Services</a></li>
              <li><a href='#horaires'>Horaires</a></li>
              <li><a href='#contact'>Contact</a></li>
            </ul>
          </div>
        </div>
      <div className="footer-right">
        <h4>Liens rapides</h4>
        <div className="container">
          <ul className="ma-list">
            <li>Mentions légales</li>
            <li>Politique de confidentialité</li>
            <li>CGU</li>
          </ul>
        </div>
      </div>
      </div>
    </section>
  )
};export default Footer