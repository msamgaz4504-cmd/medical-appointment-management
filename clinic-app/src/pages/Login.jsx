import { useState, useEffect } from 'react';
import user from '../assets/images/user.png';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";
import axios from 'axios';

function Login() {
    
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5002/api/auth/log-in', values)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/profil');
            } else {
                alert(res.data.Error || "Erreur inconnue");
            }
        })
        .catch(err => console.log(err));
    }
    return (
        <form className="inscription-page" onSubmit={handleSubmit}>
            <div className="main-container">
                <div className="form-header">
                    <img src={user} alt="user" width="50px" />
                    <h1 className="sign-login">Connexion</h1>
                    <p className="subtitle">"Accédez à votre espace patient"</p>
                </div>
                <div className="form">
                    <Input title="Email" type="email" description="votre@email.com" value={values.email} onChange={e => setValues({...values, email: e.target.value})} />
                    <Input title="Mot de passe" type="password" description="••••••••" value={values.password} onChange={e => setValues({...values, password: e.target.value})} />
                    <button className="button-field">Se connecter</button>
                    <p className="subtitle">Pas encore de compte ? <Link to="/sign-up">S'inscrire</Link></p>
                    
                </div>
            </div>
        </form>
    )

}

export default Login;