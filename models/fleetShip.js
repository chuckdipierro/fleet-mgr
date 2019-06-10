const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FleetShipSchema = new Schema({
  currHT: { type: Number, required: true },
  currSS: { type: Number, required: true },
  crits: [],
  Name: { type: String, required: true },
  captain: { type: String, required: true },
  ship: { type: Schema.Types.ObjectId, ref: 'Ship' },
});

//Export model
module.exports = mongoose.model('FleetShip', FleetShipSchema);
