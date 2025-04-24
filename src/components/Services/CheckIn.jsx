
import React from 'react';
import { Link } from 'react-router-dom';


const CheckIn = () => {
    return (
        <div className="service-card">
            <Link to="/checkin" className="service-link">
                <h3>Check-In İşlemi</h3>
                <p>Hızlı ve kolay check-in işlemi</p>
            </Link>
        </div>
    );
}

export default CheckIn;
