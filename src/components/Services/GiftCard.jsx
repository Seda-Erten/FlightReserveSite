
import React from 'react';
import { Link } from 'react-router-dom';


const GiftCard = () => {
    return (
        <div className="service-card">
            <Link to="/giftcard" className="service-link">
                <h3>Hediye Kart</h3>
                <p>Hediye kartlarıyla seyahat</p>
            </Link>
        </div>
    );
}

export default GiftCard;
