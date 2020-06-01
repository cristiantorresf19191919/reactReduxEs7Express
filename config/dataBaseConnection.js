const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const db = process.env.mongoURI;

const connectDB = async() => {
    const opt = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    };

    try {
        await mongoose.connect(db, opt);
        console.log(`Conectado a la base de datos...`);
    } catch (err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;