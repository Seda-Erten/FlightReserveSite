import React from "react";
import "./LiveChat.css";

const LiveChat = () => {
    const handleClick = () => {
        alert("Canlı destek başlatılıyor...");
    };

    return (
        <div className="live-chat-container">
            <button className="live-chat-button" onClick={handleClick}>
                <span className="chat-icon">💬</span> Canlı Destek
            </button>
        </div>
    );
};

export default LiveChat;
