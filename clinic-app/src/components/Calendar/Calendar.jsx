import { useState, useEffect } from "react";

function Calendar({ jourSelectionne, setJourSelectionne}) {
    const [date, setDate] = useState(new Date());
    const [jours, setJours] = useState([]);

    const nomJours = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    useEffect(() => {
        const nbJours = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        const tableauJours = Array.from({length : nbJours}, (_, i) => i + 1);
        setJours(tableauJours);
    }, [date]);

    function isDesactive(jour) {
        const today = new Date();
        const dateCompare = new Date(date.getFullYear(), date.getMonth(), jour);
        const dayOfWeek = dateCompare.getDay();
        return dateCompare < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || dayOfWeek === 0 || dayOfWeek === 6;
    }

    const premierJour = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const decalage = premierJour === 0 ? 6 : premierJour - 1;
    const currMonth = date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })
    
    function changerMois(direction) {
        const nouvelleDate = new Date(date);
        nouvelleDate.setMonth(nouvelleDate.getMonth() + direction);
        nouvelleDate.setDate(1);
        setDate(nouvelleDate); 
    };

    return (
        <>
            <div className="Calendrier">
                <div className="boutons">
                    <button onClick={() => changerMois(-1)}>◀</button>
                    <div className="calendar-header">{currMonth}</div>
                    <button onClick={() => changerMois(1)}>▶</button>
                </div>
                <div className="jours">
                    {nomJours.map((nom) => (
                        <span key={nom}>
                            {nom}
                        </span>
                    ))}
                </div>
                <div className="date">
                    {Array.from({ length: decalage }).map((_, i) => (
                        <span key={"empty" + i}></span>
                    ))}
                    {/* Jours du mois */}
                {jours.map((jour) => {
                    const desactive = isDesactive(jour);
                    const estSelectionne =
                        jourSelectionne &&
                        jourSelectionne.getDate() === jour &&
                        jourSelectionne.getMonth() === date.getMonth() &&
                        jourSelectionne.getFullYear() === date.getFullYear();

                    return (
                        <span
                            key={jour}
                            onClick={() => {
                                if (!desactive) {
                                    setJourSelectionne(new Date(date.getFullYear(), date.getMonth(), jour));
                                }
                            }}
                            className="jour"
                            style={{
                                color: desactive ? "#ccc" : estSelectionne ? "white" : "black",
                                backgroundColor: estSelectionne ? "#007bff" : "transparent",
                                cursor: desactive ? "not-allowed" : "pointer",
                            }}
                        >
                            {jour}
                        </span>
                    );
                })}
                </div>

            </div>
        </>
    )
}

export default Calendar;





