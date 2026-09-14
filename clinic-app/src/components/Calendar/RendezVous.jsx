import ToDo from '../../assets/ToDo.png';
import check from '../../assets/check.png';
import clock from '../../assets/clock.png';
import validation from '../../assets/validation.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function RendezVous({ jourSelectionne, heureSelectionne }) {
    const [motif, setMotif] = useState("");
    const navigate = useNavigate();

    const handleReservation = () => {
        if (!jourSelectionne || !heureSelectionne) {
            alert("Veuillez sélectionner un jour et une heure");
            return;
        }

        axios.post("/api/rendezvous/reserver", {
            
            date: jourSelectionne.toISOString().split('T')[0], 
            heure: heureSelectionne,
            motif: motif || null
        }, {
            withCredentials: true
        })
        .then((res) => {
            navigate("/profil"); 
        })
        .catch((err) => {
            if (err.response && err.response.data) {
                alert(err.response.data.message);
            } else {
                alert("Erreur serveur");
            }
        });
    }

    return (
        <div className='RendezVous'>
            <div className='RendezVous-header'>
                <img src={ToDo} alt="ToDo" width="50px" />
                <p className='votre-rendez-vous'> Votre rendez-vous</p>
            </div>

            <div className='RendezVous-body'>
                <div className='RendezVous-body-header'>
                    <img src={check} alt="check" width="50px" />
                    <div className='RendezVous-date'>
                        <p>Date</p>
                        {jourSelectionne ? 
                            <p>{jourSelectionne?.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                        :
                            <p>Non sélectionnée</p>
                        }
                    </div>
                </div>

                <div className='RendezVous-body-body'>
                    <img src={clock} alt="check" width="50px" />
                    <div className='RendezVous-heure'>
                        <p>Heure</p>
                        {heureSelectionne ? 
                            <p>{heureSelectionne}</p>
                        :
                            <p>Non sélectionnée</p>
                        } 
                    </div>
                </div>

                {(heureSelectionne && jourSelectionne) ? 
                    <div className='validation'>
                        <img src={validation} alt="validation" />
                        <p>Créneau disponible</p>
                    </div>
                    :
                    <div></div>
                }

                <div className='motif-consultation'>
                    <p>Motif de consultation</p>
                    <input
                        type="text"
                        placeholder='Décrivez brièvement le motif...'
                        value={motif}
                        onChange={(e) => setMotif(e.target.value)}
                    />
                </div>

                <button className='confirmer' onClick={handleReservation}>
                    Confirmer le rendez-vous
                </button>
            </div>
        </div>
    );
}

export default RendezVous;