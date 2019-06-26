const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
  Name: { type: String, required: true, max: 150 },
  Skill: {
    type: String,
    enum: ['Ranged (Light)', 'Ranged (Heavy)', 'Gunnery'],
    required: true,
  },
  Range: {
    type: String,
    enum: ['Close', 'Short', 'Medium', 'Long', 'Extreme'],
    required: true,
  },
  Dam: { type: Number, required: true, min: 0, max: 50 },
  Crit: { type: Number, required: true, min: 0, max: 10 },
  Price: { type: String, required: false, max: 100 },
  Restricted: { type: Boolean, required: true },
  Rarity: { type: Number, required: true, min: 0, max: 10 },
  Size: { type: String, required: false, max: 100 },
  Qualities: { type: String, required: false, max: 200 },
  Source: { type: String, required: false, max: 100 },
});

//Export model
module.exports = mongoose.model('Weapon', WeaponSchema);
