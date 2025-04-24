import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/havayolulogo.jpg";
import { useAuth } from "./AuthContext";
import "./Navbar.css";
import LanguageSelector from "./LanguageSelector";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="My Airline Logo" className="logo" />
                <span className="navbar-title">SKYWAY AIRLINES</span>
            </div>

            <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
                <Link to="/" className="navbar-link-home">Anasayfa</Link>

                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="navbar-link-auth-logout-button"
                    >
                        Çıkış Yap
                    </button>
                ) : (
                    <Link to="/auth" className="navbar-link-auth">Kayıt Ol/Giriş Yap</Link>
                )}

                <Link to="/contact" className="navbar-link-contact">İletişim</Link>
                <Link to="/check" className="navbar-link-reservation">Rezervasyon</Link>
                <LanguageSelector />
            </div>

            <div className="hamburger" onClick={toggleMenu}>
                &#9776;
            </div>
        </nav>
    );
}

export default Navbar;
