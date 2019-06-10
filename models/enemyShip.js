const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EnemyShipSchema = new Schema({
  currHT: { type: Number, required: true },
  currSS: { type: Number, required: true },
  crits: [],
  Name: { type: String, required: false },
  ship: { type: Schema.Types.ObjectId, ref: 'Ship' },
});

// Virtual for book's URL
// EnemyShipSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/book/' + this._id;
// });

//Export model
module.exports = mongoose.model('EnemyShip', EnemyShipSchema);
