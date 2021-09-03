const db = require('../utils/dbconnection.js');
const PokemonModel = require('../models/pokemonSchema.js');
const fsPromises = require('fs/promises');


// Function that returns an instance to handle the connection with the database
async function initializeDbConnection(uri) {
  try {
    return await db.connectToDataBase(uri);
  } catch (err) {
    throw err;
  }
}

// Function that creates a model and stores it in the database and returns the data 
async function createNewPokemonInDB(id, name, height, weight, frontImg, backImg, stats) {
  const Pokemon = new PokemonModel({
    'id': id,
    'name': name,
    'height': height,
    'weight': weight,
    'photos': {
      'front': frontImg,
      'back': backImg
    },
    'stats': stats,
  });

  try {
    let pokemonSaved = await Pokemon.save();
    console.log(`## ${pokemonSaved.name} was successfully saved into DB ✅`);
    return pokemonSaved;
  } catch (err) {
    console.log(`❌ Error saving pokemon ${Pokemon.name}: " + err`);
  }
}

// Function that receives an array of objects with the pokemons data and saves it in a specific path
async function createNewPokemonInFs(path, pokemonsData) {
  try {
    await fsPromises.writeFile(path, JSON.stringify(pokemonsData));
    console.log(`Successfully saved in your path: ${path} ✅`);
  } catch (err) {
    console.log(`❌ Error saving data in ${path} =( : ${err}`);
  }
}

module.exports = { initializeDbConnection, createNewPokemonInDB, createNewPokemonInFs };
