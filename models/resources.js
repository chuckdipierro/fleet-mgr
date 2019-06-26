const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ResourcesSchema = new Schema({
  ordnance: { type: Number, required: true, min: 0, max: 200 },
  morale: { type: Number, required: true, min: 0, max: 200 },
  provisions: { type: Number, required: true, min: 0, max: 200 },
  repair: { type: Number, required: true, min: 0, max: 200 },
});

//Export model
module.exports = mongoose.model('Resources', ResourcesSchema);
