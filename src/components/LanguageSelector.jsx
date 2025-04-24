import React, { useState, useEffect } from "react";
import "./LanguageSelector.css";

const LanguageSelector = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("Türkçe");

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const selectLanguage = (language) => {
        setSelectedLanguage(language);
        setIsDropdownOpen(false);
    };
    useEffect(() => {
        const closeDropdown = (e) => {
            if (!e.target.closest(".language-selector")) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("click", closeDropdown);
        return () => document.removeEventListener("click", closeDropdown);
    }, []);

    return (
        <div className="language-selector">

            <button className="language-button" onClick={toggleDropdown}>
                {selectedLanguage} <span className="dropdown-icon">▼</span>
            </button>

            {isDropdownOpen && (
                <div className="language-dropdown">
                    <ul>
                        <li onClick={() => selectLanguage("Türkçe")}>Türkçe</li>
                        <li onClick={() => selectLanguage("English")}>English</li>
                        <li onClick={() => selectLanguage("Deutsch")}>Deutsch</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
