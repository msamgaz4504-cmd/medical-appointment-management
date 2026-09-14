import { useState } from 'react';
import user from '../../assets/user.png';
import Input from './Input';
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post(
            "/api/auth/log-in",
            values,
            { withCredentials: true }
        );

        console.log(res.data);

        if (res.data.Status === "Success") {
            navigate("/admin");
        } else {
            alert(res.data.Error);
        }

    } catch (err) {
        console.error(err);
        alert("Erreur de connexion serveur");
    }
};

    return (
        <form className="inscription-page" onSubmit={handleSubmit}>
            <div className="main-container">
                <div className="form-header">
                    <img src={user} alt="user" width="50px" />
                    <h1 className="sign-login">Connexion</h1>
                    <p className="subtitle">Accédez à votre espace administrateur</p>
                </div>
                <div className="form">
                    <Input title="Email" type="email" description="votre@email.com" value={values.email} onChange={e => setValues({...values, email: e.target.value})} />
                    <Input title="Mot de passe" type="password" description="••••••••" value={values.password} onChange={e => setValues({...values, password: e.target.value})} />
                    <button className="button-field">Se connecter</button>
                </div>
            </div>
        </form>
    )

}

export default Login;