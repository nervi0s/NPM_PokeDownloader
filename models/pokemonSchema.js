const mongoose = require('../utils/dbconnection.js').mongoose;
const Schema = mongoose.Schema;


// Schema to save pokemons documents in MongoDB
const pokemon = new Schema({
  id: Number,
  name: String,
  height: Number,
  weight: Number,
  photos: {
    front: String,
    back: String
  },
  stats: Array,
  creationDate: {
    type: Date,
    default: new Date()
  }
}
);

module.exports = mongoose.model('Pokemon', pokemon);
