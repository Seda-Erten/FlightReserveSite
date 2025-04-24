import React from 'react';
import { Link } from 'react-router-dom';

const CarRent = () => {
    return (
        <div className="service-card">
            <Link to="/carrent" className="service-link">
                <h3>Araç Kiralama</h3>
                <p>Uygun fiyatlarla araç kiralama</p>
            </Link>
        </div>
    );
}

export default CarRent;
