// import express from 'express';
// import path from 'path';
const express = require('express');
// const router = express.Router();
const path = require('path');
//Import the mongoose module
const mongoose = require('mongoose');
const ship_controller = require('./controllers/shipController');
const fleetShip_controller = require('./controllers/fleetShipController');
const resources_controller = require('./controllers/resourcesController');
const app = express();

app.use(express.json()); // for parsing application/json

//Set up default mongoose connection
const mongoDB =
  'mongodb+srv://ws-admin:hjSQ7smyXoZxb6G4@swrpg-fleet-mgr-avyrs.mongodb.net/fleet-mgr?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.collection('ship-list').rename('ships');
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3'];
  res.json(list);
  console.log('Sent list of items');
});

app.get('/api/shipList', ship_controller.ship_list);
app.get('/api/fleetShipList', fleetShip_controller.fleetShip_list);
app.post('/api/addFleetShip', fleetShip_controller.fleetShip_create_post);
app.post('/api/updateFleetShip/:id', fleetShip_controller.fleetShip_update_post);
app.get('/api/resources', resources_controller.resources_get);
app.post('/api/resources', resources_controller.resources_create);
app.post('/api/resources/:id', resources_controller.resources_update);
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
