import React, { useState } from "react";
import "./ReservationCheck.css";

const ReservationCheck = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [ticketNumber, setTicketNumber] = useState("");
    const [reservationResult, setReservationResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleReservationCheck = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/reserve/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, ticketNumber }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "API isteği başarısız oldu");
            }

            const result = await response.json();
            if (result.success) {
                setReservationResult(result.data);
                setErrorMessage("");
            } else {
                setReservationResult(null);
                setErrorMessage(result.message || "Rezervasyon bulunamadı.");
            }
        } catch (error) {
            console.error("Rezervasyon kontrol hatası:", error);
            setErrorMessage(error.message || "Bir hata oluştu, lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="reservation-check">
            <h2 className="title">Rezervasyon Sorgula</h2>
            <div className="reservation-form">
                <div className="form-row">

                    <input
                        type="text"
                        placeholder="İsim"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-row">

                    <input
                        type="text"
                        placeholder="Soyisim"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-row">

                    <input
                        type="text"
                        placeholder="Bilet Numarası"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                    />
                </div>
                <button className="search-button" onClick={handleReservationCheck}>
                    Sorgula
                </button>
            </div>

            {reservationResult && (
                <div className="reservation-result">
                    <h3>Rezervasyon Bilgileri:</h3>
                    <p><strong>İsim:</strong> {reservationResult.first_name}</p>
                    <p><strong>Soyisim:</strong> {reservationResult.last_name}</p>
                    <p><strong>Bilet No:</strong> {reservationResult.ticket_number}</p>
                    <p><strong>Bilet Fiyatı:</strong> {reservationResult.price}</p>
                    <p><strong>Rezervasyon Tarihi:</strong> {new Date(reservationResult.reservation_date).toLocaleString()}</p>
                    <h3>Uçuş Detayları:</h3>
                    <p><strong>Kalkış:</strong> {reservationResult.departureLocation}</p>
                    <p><strong>Varış:</strong> {reservationResult.arrivalLocation}</p>
                    <p><strong>Kalkış Saati:</strong> {new Date(reservationResult.departureDate).toLocaleString()}</p>
                    <p><strong>Varış Saati:</strong> {new Date(reservationResult.returnDate).toLocaleString()}</p>
                </div>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default ReservationCheck;
