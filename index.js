// import express from 'express';
// import path from 'path';
const express = require('express');
// const router = express.Router();

const serverless = require('serverless-http');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const compression = require('compression');
const helmet = require('helmet');
//Use dotenv to read .env vars into Node
require('dotenv').config();
//Import the mongoose module
const mongoose = require('mongoose');
const ship_controller = require('./expressApp/controllers/shipController');
const encounter_controller = require('./expressApp/controllers/encounterController');
const enemyShip_controller = require('./expressApp/controllers/enemyShipController');
const fleetShip_controller = require('./expressApp/controllers/fleetShipController');
const resources_controller = require('./expressApp/controllers/resourcesController');
const app = express();
var expressWs = require('express-ws')(app);

app.use(express.json()); // for parsing application/json
app.use(compression());
app.use(helmet());

//Set up default mongoose connection
const mongoDB = process.env.MONGO_DB;

mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.set('useFindAndModify', false);

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.collection('ship-list').rename('ships');
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')));
app.ws('/websocket', function(ws, req) {});
var aWss = expressWs.getWss('/websocket');
exports.alertSocket = deets => {
  aWss.clients.forEach(function(client) {
    client.send(JSON.stringify(deets));
  });
};
app.get('/api/shipList', ship_controller.ship_list);
app.get('/api/fleetShipList', fleetShip_controller.fleetShip_list);
app.post('/api/addEnemyShip', enemyShip_controller.enemyShip_create_post);
app.post('/api/updateEnemyShip/:id', enemyShip_controller.enemyShip_update_post);
app.post('/api/addFleetShip', fleetShip_controller.fleetShip_create_post);
app.post('/api/updateFleetShip/:id', fleetShip_controller.fleetShip_update_post);
app.get('/api/resources', resources_controller.resources_get);
app.post('/api/resources', resources_controller.resources_create);
app.post('/api/resources/:id', resources_controller.resources_update);
app.get('/api/encounter/', encounter_controller.encounter_get_all);
app.get('/api/encounter/:id', encounter_controller.encounter_get);
app.post('/api/encounter/:id/clear', encounter_controller.encounter_clear);
app.post('/api/encounter/:id/clearRound', encounter_controller.encounter_clearRound);
app.post('/api/encounter/:id', encounter_controller.encounter_update);
app.post('/api/encounter/', encounter_controller.encounter_create);
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
module.exports = app;
module.exports.handler = serverless(app);
console.log('App is listening on port ' + port);
