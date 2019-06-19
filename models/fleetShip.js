const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FleetShipSchema = new Schema({
  acted: { type: Boolean, required: false },
  captain: { type: String, required: true },
  currHT: { type: Number, required: true },
  currSS: { type: Number, required: true },
  crits: [],
  defAftMod: { type: Number, required: true, min: -5, max: 5 },
  defForeMod: { type: Number, required: true, min: -5, max: 5 },
  defPortMod: { type: Number, required: true, min: -5, max: 5 },
  defStarboardMod: { type: Number, required: true, min: -5, max: 5 },
  Name: { type: String, required: true },
  ship: { type: Schema.Types.ObjectId, ref: 'Ship' },
  weaponsFired: [],
});

//Export model
module.exports = mongoose.model('FleetShip', FleetShipSchema);
