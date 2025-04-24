import React from "react";
import './home.css';

function Home() {
    return (
        <div>
            <Header />
            <div className="page-container">
                <div className="left-section">
                    <HeroCarousel />
                </div>
            </div>
        </div>
    );
}

export default Home;