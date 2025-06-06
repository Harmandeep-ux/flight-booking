const express = require('express');
const userRoute = require('./Routes/userRoute');
const adminRoute = require('./Routes/adminRoute');  
const flightRouter = require('./Routes/FlightRoute')
const app = express();
const db = require('./config/db');
const BookingRoute = require('./Routes/BookingRoute');
const cors = require('cors');
const { get } = require('mongoose');
require('dotenv').config()

app.use(cors({

    origin:"http://localhost:5173",
    credentials: true   
}))

app.use(express.json());

app.use('/user', userRoute);
app.use('/admin', adminRoute); 
app.use('/flights',flightRouter ); 
app.use('/booking',BookingRoute)

app.get('/', (req, res) => {
    res.send('hii');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
