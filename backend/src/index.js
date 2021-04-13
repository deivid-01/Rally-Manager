const { request } = require('express');
const express = require ('express');
const morgan = require('morgan');
const cors = require('cors');

const { mongoose} = require('./database');
//Initialization
const app = express();

//Settings
app.set('port', process.env.PORT || 5000);
//Middlewares

//Global Variables
app.use(morgan('dev'));
app.use(express.json()); //Get json data
app.use(cors({origin: 'http://localhost:3000'}));

//Routes
app.use('/api/waypoints',require('./routes/waypoint.routes'));
app.use('/api/gpx',require('./routes/gpx.routes'));
//Static FIles


// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
