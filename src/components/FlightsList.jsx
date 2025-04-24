import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReservationPrompt from "./ReservationPrompt";
import { useAuth } from "./AuthContext";
import "./FlightsList.css";

const FlightsList = () => {
    const { state } = useLocation();
    const { flights } = state || { flights: [] };
    const [showModal, setShowModal] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleReservationClick = async (flight) => {
        if (!isLoggedIn) {
            setSelectedFlight(flight);
            setShowModal(true);
            return;
        }

        navigate("/reservation", { state: { flight } });
    };

    const closeModal = () => setShowModal(false);
    const redirectToLogin = () => navigate("/auth");

    return (
        <div className="flights-list-container">
            <h2 className="flights-title">Mevcut Uçuşlar</h2>
            {flights.length === 0 ? (
                <p className="no-flights-message">Uçuş bulunamadı.</p>
            ) : (
                <ul className="flights-list">
                    {flights.map((flight) => (
                        <li key={flight.id} className="flight-item">
                            <div className="flight-details">
                                <strong className="flight-route">
                                    {flight.departureLocation} - {flight.arrivalLocation}
                                </strong>
                                <p className="flight-dates">
                                    {new Date(flight.departureDate).toLocaleDateString()} - {new Date(flight.returnDate).toLocaleDateString()}
                                </p>
                                <p className="flight-class">Sınıf: {flight.flightClass}</p>
                                <p className="flight-price">Fiyat: {flight.price} TL</p>
                                <button
                                    onClick={() => handleReservationClick(flight)}
                                    className="reservation-button"
                                >
                                    Şimdi Rezervasyon Yap
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {showModal && !isLoggedIn && (
                <ReservationPrompt
                    show={showModal}
                    onClose={closeModal}
                    onAuth={redirectToLogin}
                />
            )}
        </div>
    );
};

export default FlightsList;
