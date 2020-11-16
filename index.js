#!/usr/bin/env node
const dotenv = require('dotenv');
const http = require("http");
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}).then(connection => {
    console.log('DB connection sucessful!');
})

//Routes
const citaRouter = require('./server/routes/citaRoutes');
const diagnosticoRouter = require('./server/routes/diagnosticoRoutes');
const doctorRouter = require('./server/routes/doctorRoutes');
const pacienteRouter = require('./server/routes/pacienteRoutes');
const tratamientoRouter = require('./server/routes/tratamientoRoutes');
const userRouter = require('./server/routes/userRoutes');

app.use('/api/citas', citaRouter);
app.use('/api/diagonisticos', diagnosticoRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/pacientes', pacienteRouter);
app.use('/api/tratamientos', tratamientoRouter);
app.use('/api/users', userRouter);

// Port Environment variable
const PORT = process.env.PORT || 5000;

// Creating the node server
const SERVER = http.createServer();

// Firing up the server on selected port
app.listen(PORT);

app.on("listening", () => {
    console.log("[Server]::LISTEN:%s", PORT);
});

// Callback function for checking connecting or error
app.on("error", error => {
    throw new Error(`[Server]::ERROR:${error.message}`);
});