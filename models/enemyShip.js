const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EnemyShipSchema = new Schema({
  currHT: { type: Number, required: true },
  currSS: { type: Number, required: true },
  crits: [],
  defAftMod: { type: Number, required: true, min: -5, max: 5 },
  defForeMod: { type: Number, required: true, min: -5, max: 5 },
  defPortMod: { type: Number, required: true, min: -5, max: 5 },
  defStarboardMod: { type: Number, required: true, min: -5, max: 5 },
  Name: { type: String, required: false },
  ship: { type: Schema.Types.ObjectId, ref: 'Ship' },
  weaponsFired: [],
});

// Virtual for book's URL
// EnemyShipSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/book/' + this._id;
// });

//Export model
module.exports = mongoose.model('EnemyShip', EnemyShipSchema);
