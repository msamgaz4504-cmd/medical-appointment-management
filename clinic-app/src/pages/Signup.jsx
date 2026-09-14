import { useState, useEffect } from 'react';
import user from '../assets/images/user.png';
import Input from '../components/Input';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        password: ''
    });
    const navigate = useNavigate();
    useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Valeurs envoyées:", values);
        axios.post('/api/auth/sign-up', values)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/profil');
            } else {
                alert("Error");
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <form className="inscription-page" onSubmit={handleSubmit}>
            <div className="main-container">
                <div className="form-header">
                    <img src={user} alt="user" width="50px" />
                    <h1 className="sign-login">Inscription</h1>
                    <p className="subtitle">Créez votre compte patient</p>
                </div>
                <div className="form">
                    <Input title="Prénom" type="text" description="Prénom" value={values.prenom} onChange={e => setValues({...values, prenom: e.target.value})} />
                    <Input title="Nom" type="text" description="Nom" value={values.nom} onChange={e => setValues({...values, nom: e.target.value})} />
                    <Input title="Email" type="email" description="votre@email.com" value={values.email} onChange={e => setValues({...values, email: e.target.value})} />
                    <Input title="Téléphone" type="tel" description="06 12 34 56 78" value={values.telephone} onChange={e => setValues({...values, telephone: e.target.value})} />
                    <Input title="Mot de passe" type="password" description="Minimum 6 caractères" value={values.password} onChange={e => setValues({...values, password: e.target.value})} />
                    <button type="submit" className="button-field" description="Créer mon compte">Créer mon compte</button>
                    <p className="subtitle">Déjà un compte ? <Link to="/log-in"> Se connecter</Link></p>
                    
                </div>
            </div>
        </form>
    )

}

export default Signup;