import { useState } from "react";
import Calendar from "./Calendar";
import RendezVous from "./RendezVous";
import AvailableTime from "./AvailableTime";

function Reservation() {
    const [jourSelectionne, setJourSelectionne] = useState(null);
    const [heureSelectionne, setHeureSelectionne] = useState(null);

    return (
        <div className="reservation">
            <div className="reservation-title">
                <h1 className="prendre-rendez-vous">Prendre rendez-vous</h1>
                <p className="reservation-sous-titre">Sélectionnez une date et un créneau disponible</p>
            </div>
            
            <div className="calendar-rendezVous">
                <Calendar jourSelectionne={jourSelectionne} setJourSelectionne={setJourSelectionne} />
                <RendezVous jourSelectionne={jourSelectionne} heureSelectionne={heureSelectionne}/>
            </div>
            <AvailableTime jourSelectionne={jourSelectionne} heureSelectionne={heureSelectionne} setHeureSelectionne={setHeureSelectionne} />
        </div>
    );
}

export default Reservation;

























