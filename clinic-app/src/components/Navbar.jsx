import logo from '../assets/images/logo.png';
import menu from "../assets/images/menu.png";
import "./Navbar.css";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = ({type}) => {

    const [showMenu, setShowMenu] = useState(false);
    const handleMenu = () => {
        setShowMenu(!showMenu);
    };

    const navigate = useNavigate();
    const goHome = () => {
        navigate("/"); 
    };

  return (
    <header className='nav-bar'>
        <div className="logo-nav" onClick={goHome} style={{ cursor: "pointer" }}>
            <img src={logo} className ="logo-image"  alt="Logo"/>
            <h4 className="title">Cabinet Médical Dr. Benani</h4>
        </div>
        <ul className={`menu ${showMenu ? "active" : ""}`}>
            <li><a href='#nos-services'>Services</a></li>
            <li><a href='#horaires'>Horaires</a></li>
            <li><a href='#contact'>Contact</a></li>
            <div className="mobile-actions">
                {type === "Home" && (
                <>
                    <Link to="/log-in" className="conextion-btn">Connexion</Link>
                    <Link to="sign-up" className="inscription-btn">Inscription</Link>
                </>
                )}
                {type === "MyProfile" && (
                    <button className="inscription-btn">Dashboard</button>
                )}
            </div>
        </ul>
        <div className="action">
            {type === "Home"&&(
                <>
                <Link to="/log-in" className="conextion-btn">Connexion</Link>
                <Link to="/sign-up" className="inscription-btn">Inscription</Link>
                </>
            )}
            {type === "MyProfile"&&(
                <>
                <button className="inscription-btn">Dashboard</button>
                </> 
            )} 

            <div className={`hamburger ${showMenu ? "open" : ""}`} onClick={handleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </div>

    </header>
  );
};export default Navbar;