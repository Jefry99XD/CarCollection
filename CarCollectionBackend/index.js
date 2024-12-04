const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config(); 
const connectDB = require('./src/services/db');

const app = express();
const port = process.env.PORT
const host = process.env.HOST

app.use(cors());
app.use(cookieParser());
app.use(express.json());
connectDB();

const carRoutes = require('./src/routes/carRoute.js');
app.use('/api/car/', carRoutes);

const userRoutes = require('./src/routes/userRoute.js');
app.use('/api/user/', userRoutes);

app.listen(port, host, () => {
    console.log(`Servidor escuchando en http://${host}:${port}`);
});
