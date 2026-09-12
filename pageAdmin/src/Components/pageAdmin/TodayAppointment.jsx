import React from 'react';
import ToDo from '../../assets/ToDo.png';
import coffe from '../../assets/coffe.png';
import axios from 'axios';

function TodayAppointment({ todayAppointments, setTodayAppointments }) {

    const handleConfirm = async(id) => {
        try{
            await axios.put(`http://localhost:5002/api/admin/modifier/${id}/statut`, {statut : "confirme"}, { withCredentials: true });
            setTodayAppointments(prev => prev.map(a => a.id === id ? { ...a, statut: "confirme" } : a));
        }catch(err) {
            console.error(err);
        }
    }

     const handleCancel = async(id) => {
        try{
            await axios.put(`http://localhost:5002/api/admin/modifier/${id}/statut`, {statut : "annule"}, { withCredentials: true });
            setTodayAppointments(prev => prev.map(a => a.id === id ? { ...a, statut: "annule" } : a));
        }catch(err) {
            console.error(err);
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);

        const options = { 
            day: "2-digit", 
            month: "short", 
            year: "numeric" 
        };

        return new Intl.DateTimeFormat("fr-FR", options).format(date); 
    }
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(":");
        return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
    }

    return (
        <div className='todayAppointment'>
            <div className='headerTodayAppointment'>
                <img src={ToDo} alt="ToDo" width="50px" />
                <p>Rendez-vous du jour</p>
            </div>
            
            {todayAppointments?.length === 0 ?
                <div className='bodyTodayAppointment'>
                    <img src={coffe} alt="coffee" width="50px" />
                    <p>Aucun rendez-vous prévu aujourd'hui</p>
                </div>
                :
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>PATIENT</th>
                            <th>DATE</th>
                            <th>HEURE</th>
                            <th>MOTIF</th>
                            <th>STATUT</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todayAppointments?.map((todayAppointment) => (
                        <tr key={todayAppointment.id}>
                            <td className="patient-cell">
                                <div className="patient-info">
                                    <span className="patient-name">{todayAppointment.patient}</span>
                                    <span className="patient-email">{todayAppointment.email}</span>
                                </div>
                            </td>
                            <td>{formatDate(todayAppointment.date)}</td>
                            <td>{formatTime(todayAppointment.time)}</td>
                            <td>{todayAppointment.reason}</td>
                            <td>
                                <span className={`statut-badge statut-${todayAppointment.statut.toLowerCase()}`}>
                                    {todayAppointment.statut}
                                </span>
                            </td>
                            <td className="actions-cell">
                                <button className="action-btn edit-btn" title="Confirmé" onClick={() => handleConfirm(todayAppointment.id)}>
                                    ✅
                                </button>
                                <button className="action-btn delete-btn" title="Annulé" onClick={() => handleCancel(todayAppointment.id)}>
                                    ❌
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            }
            
        </div>
    )
}

export default TodayAppointment