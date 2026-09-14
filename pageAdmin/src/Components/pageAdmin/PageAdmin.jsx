import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Input from './Input';
import TodayAppointment from './TodayAppointment';
import AllAppointments from './AllAppointments';
import clock from '../../assets/clock.jpg';
import validation from '../../assets/validation.png';
import patient from '../../assets/patient.webp';
import ToDo from '../../assets/ToDo.png';
import './pageAdmin.css';

function PageAdmin() {
    const [day, setDay] = useState(0);
    const [attente, setAttente] = useState(0);
    const [confirmes, setConfirmes] = useState(0);
    const [totalRdv, setTotalRdv] = useState(0);
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [allAppointments, setAllAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try{
                const res = await axios.get(`/api/admin/`, { withCredentials: true });
                    setAllAppointments(res.data)

            }catch (err) {
                console.error(err);
            }
        }
        fetchAppointments();
    }, [])

    useEffect(() => {
        const fetchTodayAppointments = async () => {
            try{
                const res = await axios.get(`/api/admin/today`, { withCredentials: true });
                    setTodayAppointments(res.data)

            }catch (err) {
                console.error(err);
            }
        }
        fetchTodayAppointments();
    }, [])
useEffect(() => {
  const fetchStatistics = async () => {
    try {
      const res = await axios.get("/api/admin/stats", { withCredentials: true });
      console.log(res.data);
      setDay(res.data.day);
      setAttente(res.data.attente);
      setConfirmes(res.data.confirmes);
      setTotalRdv(res.data.totalRdv);
    } catch (err) {
      console.error(err);
    }
  };

  fetchStatistics();
  const intervalId = setInterval(fetchStatistics, 5000);
  return () => clearInterval(intervalId);

}, []);


    return (
        <div className='pageAdmin'>
            <div className='headerAdmin'>
                <h2>Dashboard Médecin</h2>
                <p>Vue d'ensemble de votre journée</p>
            </div>
            <div>
                <Input description="Aujourd'hui" number={day} src={ToDo} alt="Calendar" />
                <Input description="En attente" number={attente} src={clock} alt="Clock" />
                <Input description="Confirmés" number={confirmes} src={validation} alt="validation" />
                <Input description="Total RDV" number={totalRdv} src={patient} alt="patient" />
            </div>
            <TodayAppointment todayAppointments={todayAppointments} setTodayAppointments={setTodayAppointments} />
            <AllAppointments allAppointments={allAppointments} setAllAppointments={setAllAppointments} />
        </div>
    )
}

export default PageAdmin