const { db } = require('../config/db');
const sql = require('mssql');

const searchFlights = async (req, res) => {
    const { departureLocation, arrivalLocation, departureDate, returnDate, flightClass } = req.body;

    try {
        const pool = await db();
        const query = `
            SELECT * FROM Flights
            WHERE departureLocation = @departureLocation
            AND arrivalLocation = @arrivalLocation
            AND departureDate = @departureDate
            AND (@returnDate IS NULL OR returnDate = @returnDate)
            AND flightClass = @flightClass
            AND availableSeats > 0
        `;
        const result = await pool.request()
            .input('departureLocation', sql.NVarChar, departureLocation)
            .input('arrivalLocation', sql.NVarChar, arrivalLocation)
            .input('departureDate', sql.Date, departureDate)
            .input('returnDate', sql.Date, returnDate || null)
            .input('flightClass', sql.NVarChar, flightClass)
            .query(query);

        res.json({ flights: result.recordset });
    } catch (error) {
        console.error('Flight search error:', error);
        res.status(500).json({ message: 'An error occurred during flight search.' });
    }
};

module.exports = { searchFlights };
