
import axios from "axios";

function AllAppointments({ allAppointments, setAllAppointments }) {

    const handleConfirm = async(id) => {
        try{
            await axios.put(`/api/admin/modifier/${id}/statut`, {statut : "confirme"}, { withCredentials: true });
            setAllAppointments(prev => prev.map(a => a.id === id ? { ...a, statut: "confirme" } : a));
        }catch(err) {
            console.error(err);
        }
    }

     const handleCancel = async(id) => {
        try{
            await axios.put(`/api/admin/modifier/${id}/statut`, {statut : "annule"}, { withCredentials: true });
            setAllAppointments(prev => prev.map(a => a.id === id ? { ...a, statut: "annule" } : a));
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
        <div className='allAppointments'>
            <p>Tous les rendez-vous</p>
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
                    {allAppointments?.map((appointment) => (
                    <tr key={appointment.id}>
                        <td className="patient-cell">
                            <div className="patient-info">
                                <span className="patient-name">{appointment.patient}</span>
                                <span className="patient-email">{appointment.email}</span>
                            </div>
                        </td>
                        <td>{formatDate(appointment.date)}</td>
                        <td>{formatTime(appointment.time)}</td>
                        <td>{appointment.reason}</td>
                        <td>
                            <span className={`statut-badge statut-${appointment.statut.toLowerCase()}`}>
                                {appointment.statut}
                            </span>
                        </td>
                        <td className="actions-cell">
                            <button className="action-btn edit-btn" title="Confirmé" onClick={() => handleConfirm(appointment.id)}>
                                ✅
                            </button>
                            <button className="action-btn delete-btn" title="Annulé" onClick={() => handleCancel(appointment.id)}>
                                ❌
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllAppointments