import Navbar from '../components/Navbar';
import "./MyProfile.css";
import ProfileActions from '../components/ProfileActions';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import axios from "axios";


const MyProfile = () => {
  const [prenom, setPrenom] = useState("");

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  useEffect(() => {
    const fetchPrenom = async () => {
      try {
        const res = await axios.get("/api/auth/profil");
        if(res.data.Status === "Success") {
          setPrenom(res.data.prenom); 
        }
      } catch(err) {
        console.error("Erreur fetch prénom:", err);
      }
    };
    fetchPrenom();
  }, []); 

  return (
    <>
    <Navbar type="MyProfile" />
    <section className="profile">
      <div className="profile-container">
        <h2>Bonjour, {prenom} </h2>
        <p style={{color: " #6e6e6e"}}>Gérez vos rendez-vous médicaux</p>
        <ProfileActions/>
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default MyProfile