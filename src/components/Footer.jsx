import React from "react";
import "./Footer.css";
import { FaInstagram, FaYoutube, FaFacebook, FaPinterest, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="social-media">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={30} />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                    <FaYoutube size={30} />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={30} />
                </a>
                <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
                    <FaPinterest size={30} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={30} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={30} />
                </a>

            </div>

            <div className="footer-content">
                <ul className="footer-links">
                    <li><a href="#">Bilgi Toplumu Hizmetleri</a></li>
                    <li><a href="#">Erişilebilirlik</a></li>
                    <li><a href="#">Gizlilik ve Çerez Politikası</a></li>
                    <li><a href="#">Yasal Uyarı</a></li>
                    <li><a href="#">Yolcu Hakları</a></li>
                    <li><a href="#">Çerez Ayarlarını Değiştir</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
