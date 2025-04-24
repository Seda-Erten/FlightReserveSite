require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const flightsRoutes = require('./routes/flights');
const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/flights', flightsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reserve', reservationRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
