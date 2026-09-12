import { useState } from 'react';
import user from '../assets/images/user.png';
import Input from '../components/Input';
import Button from '../components/Button';
import Ancre from '../components/Ancre';



function LoginSignup() {
    const [action, setAction] = useState("Se connecter");

    return (
        <div className="inscription-page">
            <div className="main-container">
                <div className="form-header">
                    <img src={user} alt="user" width="50px" />
                    {action === "Se connecter" ? <h1 className="sign-login">Inscription</h1> : <h1>Connexion</h1>}
                    <p className="subtitle">{action === "Se connecter" ? "Créez votre compte patient" : "Accédez à votre espace patient"}</p>
                </div>
                <div className="form">
                    {action === "S'inscrire" && <Input title="Prénom" type="text" description="Prénom" />}
                    {action === "S'inscrire" && <Input title="Nom" type="text" description="Nom" />}
                    <Input title="Email" type="email" description="votre@email.com" />
                    {action === "S'inscrire" && <Input title="Téléphone" type="tel" description="06 12 34 56 78" />}
                    <Input title="Mot de passe" type="password" description={action === "Se connecter" ? "Minimum 6 caractères" : "••••••••"} />
                    <Button description={action} />
                    <p className="subtitle">{action === "Se connecter" ? "Déjà un compte ? " : "Pas encore de compte ? "}<Ancre href="#" action={action} setAction={setAction} /></p>
                    
                </div>
            </div>
        </div>
    )

};export default LoginSignup;