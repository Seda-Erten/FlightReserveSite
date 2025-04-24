import React from "react";
import "./FlightSuggestion.css";

function FlightSuggestion({ destination, price, text, image }) {
  return (
    <div className="flight-card">
      <img src={image} alt={destination} className="flight-image" />
      <h3>{destination}</h3>
      <p>{text}</p>
      <p className="flight-price">{price}</p>
    </div>
  );
}

export default FlightSuggestion;
