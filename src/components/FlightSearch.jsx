import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FlightSearch.css';

const FlightSearch = () => {
    const [departureLocation, setDepartureLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengerCount, setPassengerCount] = useState(1);
    const [flightClass, setFlightClass] = useState('economy');
    const [journeyType, setJourneyType] = useState('one-way');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const searchData = {
            departureLocation,
            arrivalLocation,
            departureDate,
            returnDate: journeyType === 'round-trip' ? returnDate : null,
            passengerCount,
            flightClass,
            journeyType,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/flights/search', searchData);
            navigate('/flights-list', { state: { flights: response.data.flights } });
        } catch (error) {
            console.error('Flight search error:', error);
        }
    };

    return (
        <div className="flight-search-container">
            <h2 className="title">Uçuş Ara</h2>

            <div className="journey-type-options">
                <button
                    className={`journey-button ${journeyType === 'one-way' ? 'active' : ''}`}
                    onClick={() => setJourneyType('one-way')}
                >
                    Tek Yön
                </button>
                <button
                    className={`journey-button ${journeyType === 'round-trip' ? 'active' : ''}`}
                    onClick={() => setJourneyType('round-trip')}
                >
                    Gidiş-Dönüş
                </button>
            </div>

            <form className="flight-search-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="departureLocation">Kalkış Yeri</label>
                    <input
                        type="text"
                        id="departureLocation"
                        value={departureLocation}
                        onChange={(e) => setDepartureLocation(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="arrivalLocation">Varış Yeri</label>
                    <input
                        type="text"
                        id="arrivalLocation"
                        value={arrivalLocation}
                        onChange={(e) => setArrivalLocation(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="departureDate">Kalkış Tarihi</label>
                    <input
                        type="date"
                        id="departureDate"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        required
                    />
                </div>

                {journeyType === 'round-trip' && (
                    <div className="form-row">
                        <label htmlFor="returnDate">Dönüş Tarihi</label>
                        <input
                            type="date"
                            id="returnDate"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                        />
                    </div>
                )}

                <div className="form-row">
                    <label htmlFor="passengerCount">Yolcu Sayısı</label>
                    <input
                        type="number"
                        id="passengerCount"
                        min="1"
                        value={passengerCount}
                        onChange={(e) => setPassengerCount(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="flightClass">Sınıf</label>
                    <select
                        id="flightClass"
                        value={flightClass}
                        onChange={(e) => setFlightClass(e.target.value)}
                    >
                        <option value="economy">Ekonomi</option>
                        <option value="business">İş</option>
                        <option value="first-class">Birinci Sınıf</option>
                    </select>
                </div>

                <button type="submit" className="search-button">Ara</button>
            </form>
        </div>
    );
};

export default FlightSearch;
