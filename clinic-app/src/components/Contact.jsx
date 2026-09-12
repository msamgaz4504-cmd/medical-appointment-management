import "./Services";
import ServicesCard from './ServicesCard';
import adresseicon from "../assets/images/locationicon.png";
import emailicon from "../assets/images/mailicon.png";
import teleicon from "../assets/images/teleicon.png";

const Contact = () => {
  const contact = [{id: 5, image: adresseicon, title: "Adresse", description: "15 Avenue Ibn Batota, 75014 Safi"},
                  {id: 6, image: teleicon, title: "Téléphone", description: "0650169004"},
                  {id: 7, image: emailicon, title: "Email", description: "contact@gmail.com"}
  ];
  return (
    <section className="services-section" id="contact">
        <h1>Nous contacter</h1>
        <ServicesCard items = {contact}/>    
    </section>
  )
};export default Contact