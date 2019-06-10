const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShipSchema = new Schema({
  hullType: { type: String, required: true, max: 100 },
  Class: { type: String, required: true, max: 100 },
  Silhouette: { type: Number, required: true, min: 0, max: 10 },
  Speed: { type: Number, required: true, min: 0, max: 10 },
  Handling: { type: Number, required: true, min: -10, max: 10 },
  defFore: { type: Number, required: true, min: 0, max: 5 },
  defPort: { type: Number, required: true, min: 0, max: 5 },
  defStarboard: { type: Number, required: true, min: 0, max: 5 },
  defAft: { type: Number, required: true, min: 0, max: 5 },
  Armor: { type: Number, required: true, min: 0, max: 20 },
  HT: { type: Number, required: true, min: 0, max: 1000 },
  SS: { type: Number, required: true, min: 0, max: 1000 },
  Manufacturer: { type: String, required: false, max: 500 },
  Massive: { type: Number, required: true, min: 0, max: 5 },
  Hyperdrive: { type: String, required: true, max: 150 },
  Navicomputer: Boolean,
  sensorRange: {
    type: String,
    enum: ['Close', 'Short', 'Medium', 'Long', 'Extreme'],
  },
  image: { type: String, required: false, max: 100 },
  shipsComplement: { type: String, required: false, max: 500 },
  dockingBay: { type: String, required: false, max: 500 },
  encumbranceCapacity: { type: String, required: false, max: 100 },
  passengerCapacity: { type: String, required: false, max: 100 },
  Consumables: { type: String, required: false, max: 100 },
  Cost: { type: String, required: false, max: 100 },
  Restricted: { type: Boolean, required: true },
  Rarity: { type: Number, required: true, min: 0, max: 10 },
  HP: { type: Number, required: true, min: 0, max: 10 },
  // Weapons: [{ type: Schema.Types.ObjectId, ref: 'WeaponMount' }],
  Weapons: [],
});

// // Virtual for author's full name
// ShipSchema
// .virtual('name')
// .get(function () {
//   return this.family_name + ', ' + this.first_name;
// });

// // Virtual for author's lifespan
// ShipSchema
// .virtual('lifespan')
// .get(function () {
//   return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
// });

// // Virtual for author's URL
// ShipSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/author/' + this._id;
// });

//Export model
module.exports = mongoose.model('Ship', ShipSchema);
