import time from '../../assets/time.png';
import date from '../../assets/date.png';

function AvailableTime({ jourSelectionne, heureSelectionne, setHeureSelectionne }) {

    const morningSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
    const afternoonSlots = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

    return (
        <div className="container-creneaux">
            <div className='AvailableTime-header'>
                <img src={time} alt="time" width="50px" />
                <p className="titre">Créneaux disponibles</p>
            </div>
            {jourSelectionne === null ?
                <div className='AvailableTime-body'>
                    <img src={date} alt="date" width="50px" />
                    <p>Sélectionnez une date pour voir les créneaux</p>
                </div>
                :
                <div className="creneaux">
                    <div className="creneaux-matin">
                        <p>matin</p>
                        {morningSlots.map((heure) => 
                            <span 
                                key={heure} 
                                onClick={() => setHeureSelectionne(heure)}
                                className={heureSelectionne === heure ? "creneau-selectionne" : ""}
                                >
                                {heure}
                            </span>
                        )}
                    </div>
                    <div className="creneaux-apres-midi">
                        <p>apres midi</p>
                        {afternoonSlots.map((heure) => 
                            <span 
                                key={heure} 
                                onClick={() => setHeureSelectionne(heure)}
                                className={heureSelectionne === heure ? "creneau-selectionne" : ""}
                                >
                                {heure}
                            </span>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}

export default AvailableTime;





