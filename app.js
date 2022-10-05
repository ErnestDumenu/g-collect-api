const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Establish and Test Database Connection
const db = require('./config/database');

try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
    
const app=express();

const PORT= process.env.PORT || 5000;

app.get('/', (req,res) =>
    res.send('INDEX'));

app.listen(PORT,  console.log('Server Started on Port %s', PORT));