import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = () => {
    const images = [
        '/1577716354.jpg',
        '/avusturya-gezilecek-yerler.jpg',
        '/bursa-53374.webp',
        '/airline2.jpg',
        '/airline3.jpg',
        '/paris-ecctur.jpg',
        '/kapadokya-53819.webp',
        '/istanbul-gezilecek-yerler-kiz-kulesi.jpg',
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-content">
                <img
                    src={images[currentIndex]}
                    alt={`carousel-image-${currentIndex}`}
                    className="carousel-image"
                />
            </div>


            <div className="carousel-dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
