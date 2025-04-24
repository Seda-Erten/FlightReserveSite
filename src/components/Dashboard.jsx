import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Hoş Geldiniz, Kullanıcı!</h1>
            <div className="dashboard-cards">
                <div className="card">
                    <h3>Toplam Uçuşlar</h3>

                </div>
                <div className="card">
                    <h3>Toplam Rezervasyon</h3>

                </div>
                <div className="card">
                    <h3>Aktif Kullanıcılar</h3>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
