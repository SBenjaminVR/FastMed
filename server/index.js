#!/usr/bin/env node
const dotenv = require('dotenv');
const http = require("http");
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
if (process.env.NODE_ENV !== 'production'){
    dotenv.config({ path: './../config.env'});
}


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}).then(connection => {
    console.log('DB connection sucessful!');
})

app.use(express.static(path.resolve('./client/build')));

//Routes
const authRouter =require('./routes/authRoutes');
const citaRouter = require('./routes/citaRoutes');
const consultaRouter = require('./routes/consultaRoutes');
const diagnosticoRouter = require('./routes/diagnosticoRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const pacienteRouter = require('./routes/pacienteRoutes');
const tratamientoRouter = require('./routes/tratamientoRoutes');
const userRouter = require('./routes/userRoutes');


app.use('/api/citas', citaRouter);
app.use('/api/login', authRouter);
app.use('/api/diagnosticos', diagnosticoRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/pacientes', pacienteRouter);
app.use('/api/tratamientos', tratamientoRouter);
app.use('/api/users', userRouter);
app.use('/api/consultas', consultaRouter);

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./client/build/index.html'));
  });
  
app.get('/*', (req,res) => {
    res.sendFile(path.resolve('./client/build/index.html'));
})

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