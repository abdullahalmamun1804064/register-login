const express = require('express');
const app = express();


const bodyParser = require('body-parser')
const errorMiddleware = require('./middlewares/errors')

// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'config/config.env' })


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Import all routes

const auth = require('./routes/auth');
app.get('/', function (req, res) {
    res.send("App is Running Successfully");
});
app.use('/api/v1', auth)



// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app 