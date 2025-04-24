import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ReservationPage.css";

const ReservationPage = () => {
    const { state } = useLocation();
    const { flight } = state || {};
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [reservationDetails, setReservationDetails] = useState(null);

    if (!flight) {
        return <p className="error-message">Uçuş bilgisi bulunamadı.</p>;
    }

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const handlePaymentInfoChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleReserve = async (e) => {
        e.preventDefault();


        if (
            !userInfo.firstName ||
            !userInfo.lastName ||
            !userInfo.email ||
            !userInfo.phone ||
            !paymentInfo.cardNumber ||
            !paymentInfo.cardName ||
            !paymentInfo.expiryDate ||
            !paymentInfo.cvv
        ) {
            setErrorMessage("Lütfen tüm alanları doldurun!");
            return;
        }

        try {

            const reservationResponse = await axios.post("http://localhost:5000/api/reserve", {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                phone: userInfo.phone,
                flightId: flight.id,
                price: flight.price,
                paymentInfo: {
                    cardNumber: paymentInfo.cardNumber,
                    cardName: paymentInfo.cardName,
                    expiryDate: paymentInfo.expiryDate,
                    cvv: paymentInfo.cvv,
                },
            });

            if (reservationResponse.status === 201) {
                const ticketNumber = reservationResponse.data.ticketNumber;

                setReservationDetails({
                    ticketNumber,
                    flightDetails: flight,
                });
                setIsSubmitted(true);
                setErrorMessage("");
            } else {
                setErrorMessage("Rezervasyon sırasında bir sorun oluştu.");
            }
        } catch (error) {
            console.error("Hata:", error);
            setErrorMessage("Bir hata oluştu, lütfen tekrar deneyin!");
        }
    };

    return (
        <div className="reservation-page">
            <h2 className="reservation-title">Rezervasyon</h2>
            <h3 className="selected-flight-title">Seçilen Uçuş</h3>
            <p className="flight-details">
                <strong className="flight-location">
                    {flight.departureLocation} - {flight.arrivalLocation}
                </strong>
            </p>
            <p className="flight-dates">
                {new Date(flight.departureDate).toLocaleDateString()} -{" "}
                {new Date(flight.returnDate).toLocaleDateString()}
            </p>
            <p className="flight-price">Fiyat: {flight.price} TL</p>

            <form onSubmit={handleReserve} className="reservation">
                <h3 className="personal-info-title">Kişisel Bilgiler</h3>
                <input
                    type="text"
                    name="firstName"
                    className="input-field"
                    placeholder="Ad"
                    value={userInfo.firstName}
                    onChange={handleUserInfoChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    className="input-field"
                    placeholder="Soyad"
                    value={userInfo.lastName}
                    onChange={handleUserInfoChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    className="input-field"
                    placeholder="E-posta"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    className="input-field"
                    placeholder="Telefon"
                    value={userInfo.phone}
                    onChange={handleUserInfoChange}
                    required
                />

                <h3 className="payment-info-title">Ödeme Bilgileri</h3>
                <input
                    type="text"
                    name="cardNumber"
                    className="input-field"
                    placeholder="Kart Numarası"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentInfoChange}
                    required
                />
                <input
                    type="text"
                    name="cardName"
                    className="input-field"
                    placeholder="Kart Üzerindeki İsim"
                    value={paymentInfo.cardName}
                    onChange={handlePaymentInfoChange}
                    required
                />
                <input
                    type="text"
                    name="expiryDate"
                    className="input-field"
                    placeholder="Son Kullanma Tarihi (MM/YY)"
                    value={paymentInfo.expiryDate}
                    onChange={handlePaymentInfoChange}
                    required
                />
                <input
                    type="text"
                    name="cvv"
                    className="input-field"
                    placeholder="CVV"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentInfoChange}
                    required
                />

                <button type="submit" className="submit-button">Rezervasyonu ve Ödemeyi Tamamla</button>

                {isSubmitted && reservationDetails && (
                    <div className="success-message">
                        <h3>Rezervasyonunuz ve Ödemeniz Başarıyla Tamamlandı!</h3>
                        <p>Bilet Numaranız: {reservationDetails.ticketNumber}</p>
                        <p>
                            {reservationDetails.flightDetails.departureLocation} -{" "}
                            {reservationDetails.flightDetails.arrivalLocation}
                        </p>
                        <p>
                            {new Date(reservationDetails.flightDetails.departureDate).toLocaleDateString()} -{" "}
                            {new Date(reservationDetails.flightDetails.returnDate).toLocaleDateString()}
                        </p>
                        <p>Fiyat: {reservationDetails.flightDetails.price} TL</p>
                    </div>
                )}


                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default ReservationPage;
