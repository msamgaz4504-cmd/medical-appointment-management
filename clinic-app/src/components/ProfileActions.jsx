import calendar from "../assets/images/calendar.png";
import checkicon from "../assets/images/checkicon.png";
import videCalendar from "../assets/images/videCalendar.png";
import add from "../assets/images/add.png";
import "./ProfileActions.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const ProfileActions = () => {
    const [reservation, setReservation] = useState([])
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        axios.get("/api/auth/me", { withCredentials: true })
            .then(res => setUserId(res.data.id))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
    axios.get(`/api/rendezvous/mes-reservations`, {withCredentials: true})
        .then(res => {
            const transforme = res.data.map(r => {
                const now = new Date();
                const rvDate = new Date(r.date);
                const [heure, minute] = r.heure.split(":").map(Number);
                rvDate.setHours(heure, minute, 0);

                return {
                    id: r.id,
                    date: rvDate,
                    dateFormatted: rvDate.toLocaleDateString("fr-FR", { day: '2-digit', month: 'long', year: 'numeric' }),
                    time: `${heure.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}`,
                    statut: r.statut,
                    temporal: rvDate < now ? "passed" : "futur",
                    motif: r.motif
                };
            });
            setReservation(transforme);
        })
        .catch(err => console.log(err));
}, []);

    const futurReservation = reservation.filter(r => r.temporal === "futur");
    const countFutur = futurReservation.length ;
    const passedReservation = reservation.filter(r => r.temporal === "passed");
    const countPassed = passedReservation.length ;
    const deleteReservation = async(id) => {
        try{
            await axios.delete(`/api/rendezvous/mes-reservations/${id}`, {withCredentials: true});
            setReservation(prev => prev.filter(r => r.id !== id));
            console.log("supprime avec succes");
        }catch (error){
            console.error("Erreur lors de la suppression :", error.response?.data || error.message);
        }
    };

  return (
    <>
    <div className="MyProfile-actions">
        <div className="futur-reservation">
            <div className="action-container">
                <p>Rendez-vous à venir</p>
                <h1 style={{color: "#2563eb"}}>{countFutur}</h1>
            </div>
            <img src={calendar} alt="calendar"/>
        </div>
        <div className="passed-reservation">
            <div className="action-container">
                <p>Consultations passées</p>
                <h1 style={{color: "#10b981"}}>{countPassed}</h1>
            </div>
            <img src={checkicon} alt="calendar"/>
        </div>

        <Link to = "/reservation" className="add-reservation link-reset">
            <div className="add-reservation">
                <div className="action-container">
                    <p style={{color:"#d3e0fa"}}>Nouveau rendez-vous</p>
                    <h3 style={{color:"#ffff"}} >Réserver maintenant</h3>
                </div>
                <img src={add} alt="add"/>
            </div>
        </Link>
    </div>
    <div className="reservation-list">
            <h2>Mes rendez-vous</h2>
            <p className="soustitle">Gérez vos prochains rendez-vous médicaux</p>
            
            {futurReservation.length === 0 ? (
                <div className="aucun-reservation">
                    <img src={videCalendar} alt="videCalendar"/>
                    <p>Aucun rendez-vous à venir</p>
                </div>
            ) : (
                futurReservation.map(r => {
    const day = r.dateFormatted.split(" ")[0];
    const month = r.dateFormatted.split(" ")[1].substring(0, 3).toUpperCase() + ".";

    return (
        <div className="futur-card" key={r.id}>
            <div className="res-date-badge">
                <span className="res-day">{day}</span>
                <span className="res-month">{month}</span>
            </div>

            <div className="reservation-infos">
                <h4>{r.date.toLocaleDateString("fr-FR", { weekday: "long" })} à {r.time}</h4>
            </div>

            <div className="res-status-actions">
                <span className={`status-badge ${r.statut.replace(" ", "-")}`}>
                    {r.statut}
                </span>
                <button className="delete-icon-btn" onClick={() => deleteReservation(r.id)}>
                    &times;
                </button>
            </div>
        </div>
    );
})
            )}
        </div>
    </>
    
  )
}

export default ProfileActions