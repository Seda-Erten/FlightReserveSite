import React from 'react';
import { Link } from 'react-router-dom';


const Insurance = () => {
    return (
        <div className="service-card">
            <Link to="/insurance" className="service-link">
                <h3>Sigorta</h3>
                <p>Yolculuk sigortası hizmetleri</p>
            </Link>
        </div>
    );
}

export default Insurance;
