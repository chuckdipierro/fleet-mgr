const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WeaponMountSchema = new Schema({
  count: { type: Number, required: true, min: 0, max: 1000 },
  linked: { type: Number, required: true, min: 0, max: 3 },
  mount: { type: String, required: true },
  position: { type: String, required: true },
  type: { type: String, required: true },
  weapon: { type: Schema.Types.ObjectId, ref: 'Weapon' },
});

//Export model
module.exports = mongoose.model('WeaponMount', WeaponMountSchema);
