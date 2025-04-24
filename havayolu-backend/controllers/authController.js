const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../config/db");
const sql = require('mssql');


const register = async (req, res) => {
    const { ad, soyad, email, telefon, password } = req.body;

    try {
        const pool = await db();
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM users WHERE email = @email');

        if (result.recordset.length > 0) {
            return res.status(400).json({ message: "Bu e-posta zaten kayıtlı!" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.request()
            .input('ad', sql.NVarChar, ad)
            .input('soyad', sql.NVarChar, soyad)
            .input('email', sql.NVarChar, email)
            .input('telefon', sql.NVarChar, telefon)
            .input('password', sql.NVarChar, hashedPassword)
            .query('INSERT INTO users (ad, soyad, email, telefon, password) VALUES (@ad, @soyad, @email, @telefon, @password)');

        return res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi!" });
    } catch (error) {
        console.error("Kayıt hatası: ", error);
        return res.status(500).json({ message: "Kayıt sırasında bir hata oluştu!" });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await db();
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM users WHERE email = @email');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
        }


        const isPasswordValid = await bcrypt.compare(password, result.recordset[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Geçersiz şifre!" });
        }


        const token = jwt.sign(
            { id: result.recordset[0].id, email: result.recordset[0].email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Giriş başarılı!", token });
    } catch (error) {
        console.error("Giriş hatası: ", error);
        return res.status(500).json({ message: "Giriş sırasında bir hata oluştu!" });
    }
};

module.exports = {
    register,
    login,
};
