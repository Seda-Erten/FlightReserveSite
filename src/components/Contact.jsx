import React from "react";
import "./Contact.css";

function Contact() {
    return (
        <div className="contact-container">
            <h2>Bize Ulaşın</h2>
            <p>Herhangi bir sorunuz varsa lütfen aşağıdaki formu doldurun.</p>
            <form>
                <input type="text" placeholder="Adınız" required />
                <input type="email" placeholder="Email Adresiniz" required />
                <textarea placeholder="Mesajınız" required></textarea>
                <button type="submit">Gönder</button>
            </form>
        </div>
    );
}

export default Contact;

