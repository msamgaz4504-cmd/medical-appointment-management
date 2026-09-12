import "./Services.css";
import ServicesCard from './ServicesCard';
import service1 from "../assets/images/service1.png";
import service2 from "../assets/images/service2.png";
import service3 from "../assets/images/service3.png";
import service4 from "../assets/images/service4.png";

const Services = () => {
  const services = [{id: 1, image:service1, title:"Consultation Générale", description:"Bilan de santé complet et suivi personnalisé"},
                    {id: 2, image:service2, title:"Pédiatrie", description:"Soins spécialisés pour les enfants"},
                    {id: 3, image:service3, title:"Vaccinations", description:"Protocoles vaccinaux à jour"},
                    {id: 4, image:service4, title:"Téléconsultation", description:"Consultez depuis chez vous"}];
    return(
        
        <section className="services-section" id="nos-services">
            <h1>Nos Services</h1>
            <p className='desc'>Des soins de qualité adaptés à vos besoins</p>
            <ServicesCard items = {services}/>
            
        </section>
        
    )
    
};export default Services