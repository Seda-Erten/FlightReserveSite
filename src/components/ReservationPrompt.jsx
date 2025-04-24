import React from "react";
import "./ReservationPrompt.css";

const ReservationPrompt = ({ show, onClose, onAuth }) => {
    if (!show) return null;

    return (
        <div className="prompt-overlay">
            <div className="prompt-container">
                <div className="icon">!</div>
                <h3>Devam Etmek İçin Üye Olun veya Giriş Yapın</h3>
                <div className="prompt-buttons">
                    <button onClick={onAuth} className="auth-button">
                        Giriş Yap / Üye Ol
                    </button>
                </div>
                <button onClick={onClose} className="close-button">X</button>
            </div>
        </div>
    );
};

export default ReservationPrompt;
