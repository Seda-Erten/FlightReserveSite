const { db } = require('../config/db');
const sql = require('mssql');


async function createReservation(req, res) {
    try {

        const pool = await db();


        const ticketNumber = 'TICKET-' + Math.floor(Math.random() * 1000000);

        const result = await pool.request()
            .input('firstName', sql.NVarChar, req.body.firstName)
            .input('lastName', sql.NVarChar, req.body.lastName)
            .input('email', sql.NVarChar, req.body.email)
            .input('phone', sql.NVarChar, req.body.phone)
            .input('flightId', sql.Int, req.body.flightId)
            .input('ticketNumber', sql.NVarChar, ticketNumber)
            .input('price', sql.Decimal, req.body.price)
            .input('reservationDate', sql.DateTime, new Date())
            .query(`
                INSERT INTO Reservations (first_name, last_name, email, phone, flight_id, ticket_number, price, reservation_date) 
                VALUES (@firstName, @lastName, @email, @phone, @flightId, @ticketNumber, @price, @reservationDate)
            `);


        res.status(201).send({ message: 'Rezervasyon başarıyla oluşturuldu', ticketNumber });
    } catch (error) {

        console.error('Rezervasyon hatası:', error);
        res.status(500).send({ message: 'Rezervasyon oluşturulurken bir hata oluştu.' });
    }
}


async function checkReservation(req, res) {
    try {
        const { firstName, lastName, ticketNumber } = req.body;

        const pool = await db();

        const result = await pool.request()
            .input('firstName', sql.NVarChar, firstName)
            .input('lastName', sql.NVarChar, lastName)
            .input('ticketNumber', sql.NVarChar, ticketNumber)
            .query(`
                SELECT r.id, r.first_name, r.last_name, r.email, r.phone, r.ticket_number, r.price, r.reservation_date,
                       f.departureLocation, f.arrivalLocation, f.departureDate, f.returnDate, f.flightClass, f.price AS flightPrice, f.availableSeats
                FROM [myairline].[dbo].[reservations] r
                JOIN [myairline].[dbo].[Flights] f ON r.flight_id = f.id
                WHERE r.ticket_number = @ticketNumber AND r.first_name = @firstName AND r.last_name = @lastName;
            `);

        if (result.recordset.length > 0) {
            res.status(200).send({ success: true, data: result.recordset[0] });
        } else {
            res.status(404).send({ success: false, message: 'Rezervasyon bulunamadı.' });
        }
    } catch (error) {
        console.error('Rezervasyon sorgulama hatası:', error);
        res.status(500).send({ message: 'Rezervasyon sorgulama sırasında bir hata oluştu.' });
    }
}

module.exports = { createReservation, checkReservation };
