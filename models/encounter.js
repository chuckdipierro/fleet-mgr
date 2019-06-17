const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EncounterSchema = new Schema({
  enemies: [{ type: Schema.Types.ObjectId, ref: 'EnemyShip' }],
  rebels: [],
  turn: { type: Number, required: true, min: 0, max: 100 },
});

//Export model
module.exports = mongoose.model('Encounter', EncounterSchema);
