import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FlightSuggestion from "./components/FlightSuggestion";
import Contact from "./components/Contact";
import LiveChat from "./components/LiveChat";
import CheckIn from "./components/Services/CheckIn";
import CarRent from "./components/Services/CarRent";
import Insurance from "./components/Services/Insurance";
import GiftCard from "./components/Services/GiftCard";
import Carousel from './components/Carousel';
import FlightSearch from './components/FlightSearch';
import AuthForm from './components/AuthForm';
import ReservationCheck from "./components/ReservationCheck";
import FlightsList from './components/FlightsList';
import { AuthProvider } from "./components/AuthContext";
import ReservationPage from "./components/ReservationPage";
import './components/Services/Home.css';



function Home() {
  const flightSuggestions = [
    {
      destination: "Berlin, Almanya",
      price: "$350",
      text: "Berlin'i keşfet.",
      image: "/berlin.jpg",
    },
    {
      destination: "Los Angeles, USA",
      price: "$500",
      text: "Los Angeles'ı keşfet.",
      image: "/losangeles.jpg",
    },
    {
      destination: "Dubai, BAE",
      price: "$700",
      text: "Dubai'yi keşfet.",
      image: "/dubai.jpg",
    },
    {
      destination: "İsveç,Stockholm",
      price: "$300",
      text: "Gize'yi keşfet.",
      image: "/stockholm.jpg",
    },
    {
      destination: "İtalya,Roma",
      price: "$950",
      text: "Roma'yı keşfet.",
      image: "/roma.jpg",
    },
    {
      destination: "Mısır,Gize",
      price: "$800",
      text: "Gize'yi keşfet.",
      image: "/mısır.jpg",
    },
  ];

  return (
    <div>
      <div className="main-container">
        <Carousel />
        <FlightSearch />
      </div>

      <div className="services-container">
        <div className="service-card">
          <CheckIn />
        </div>
        <div className="service-card">
          <CarRent />
        </div>
        <div className="service-card">
          <Insurance />
        </div>
        <div className="service-card">
          <GiftCard />
        </div>
      </div>

      <div className="suggestions-container-text">
        <h1>SONRAKİ SEYAHATİN NEREYE?</h1>
        <h2>İSTANBUL KALKIŞLI UÇUŞLAR</h2>
      </div>
      <div className="suggestions-container">
        {flightSuggestions.map((flight, index) => (
          <FlightSuggestion
            key={index}
            destination={flight.destination}
            price={flight.price}
            text={flight.text}
            image={flight.image}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/flights-list" element={<FlightsList />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/carrent" element={<CarRent />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/giftcard" element={<GiftCard />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/check" element={<ReservationCheck />} />


        </Routes>
        <Footer />
        <LiveChat />
      </Router>
    </AuthProvider>
  );
}


export default App;
