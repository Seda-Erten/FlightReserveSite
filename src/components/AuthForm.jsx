import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "./AuthForm.css";

const AuthForm = () => {
    const [registerData, setRegisterData] = useState({
        ad: "",
        soyad: "",
        email: "",
        telefon: "",
        password: "",
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", registerData);
            alert(response.data.message);
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Kayıt sırasında hata oluştu!");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", loginData);
            alert(response.data.message);
            localStorage.setItem("token", response.data.token);
            login();
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Giriş sırasında hata oluştu!");
        }
    };

    return (
        <div className="auth-container">
            {isLogin ? (
                <div className="form login-form">
                    <h2 className="form-title">Giriş Yap</h2>
                    <form onSubmit={handleLogin}>
                        <label className="form-label" htmlFor="email">E-Posta Adresiniz *</label>
                        <input
                            className="form-input"
                            type="email"
                            id="email"
                            placeholder="Lütfen e-posta adresinizi yazınız"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            required
                        />
                        <label className="form-label" htmlFor="password">Şifreniz *</label>
                        <input
                            className="form-input"
                            type="password"
                            id="password"
                            placeholder="Lütfen şifrenizi yazınız"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            required
                        />
                        <button type="submit" className="form-button">Giriş Yap</button>
                    </form>
                    <p className="form-footer">
                        Henüz üye değil misiniz? <button className="toggle-button" onClick={() => setIsLogin(false)}>Kayıt Ol</button>
                    </p>
                </div>
            ) : (
                <div className="form register-form">
                    <h2 className="form-title">Üye Ol</h2>
                    <form onSubmit={handleRegister}>
                        <label className="form-label" htmlFor="ad">Adınız *</label>
                        <input
                            className="form-input"
                            type="text"
                            id="ad"
                            placeholder="Lütfen adınızı yazınız"
                            value={registerData.ad}
                            onChange={(e) => setRegisterData({ ...registerData, ad: e.target.value })}
                            required
                        />
                        <label className="form-label" htmlFor="soyad">Soyadınız *</label>
                        <input
                            className="form-input"
                            type="text"
                            id="soyad"
                            placeholder="Lütfen soyadınızı yazınız"
                            value={registerData.soyad}
                            onChange={(e) => setRegisterData({ ...registerData, soyad: e.target.value })}
                            required
                        />
                        <label className="form-label" htmlFor="email">E-Posta Adresiniz *</label>
                        <input
                            className="form-input"
                            type="email"
                            id="email"
                            placeholder="Lütfen e-posta adresinizi yazınız"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            required
                        />
                        <label className="form-label" htmlFor="telefon">Telefon Numaranız *</label>
                        <input
                            className="form-input"
                            type="text"
                            id="telefon"
                            placeholder="Lütfen telefon numaranızı yazınız"
                            value={registerData.telefon}
                            onChange={(e) => setRegisterData({ ...registerData, telefon: e.target.value })}
                            required
                        />
                        <label className="form-label" htmlFor="password">Şifreniz *</label>
                        <input
                            className="form-input"
                            type="password"
                            id="password"
                            placeholder="Lütfen şifrenizi yazınız"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            required
                        />
                        <button type="submit" className="form-button">Kayıt Ol</button>
                    </form>
                    <p className="form-footer">
                        Zaten üye misiniz? <button className="toggle-button" onClick={() => setIsLogin(true)}>Giriş Yap</button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default AuthForm;
