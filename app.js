const PokemonCreator = require('./crud/createPokemon.js');
const PokemonManager = require('./utils/pokemonManager.js');

/**
 * Get pokemons data and store it in a database
 * @param   {String}  uri                   URL to connect to the database  mongodb://username:password@127.0.0.1:27017/dataBaseName
 * @param   {Number}  initialPokemonNumber  Number of the first pokemon data that you want
 * @param   {Number}  finalPokemonNumber    Number of the last pokemon data that you want element that triggered the tab
 * @param   {Number}  timeBetweenRequests   Number in ms to make requests to the server API
 * @returns {Array}   Return an array of objects with the pokemons data
 */
async function getPokemonsDataAndStoreInDb(uri, initialPokemonNumber, finalPokemonNumber, timeBetweenRequests = 200) {
  let pokemonsData = [];
  let dbconnection;
  try {
    dbconnection = await PokemonCreator.initializeDbConnection(uri);
    pokemonsData = await PokemonManager.getPokemonsData(initialPokemonNumber, finalPokemonNumber, timeBetweenRequests);
    for (let i = 0; i < pokemonsData.length; i++) {
      await PokemonCreator.createNewPokemonInDB(pokemonsData[i].id, pokemonsData[i].name, pokemonsData[i].height, pokemonsData[i].weight, pokemonsData[i].frontImg, pokemonsData[i].backImg, pokemonsData[i].stats);
    }
  } catch (err) {
    throw err;
  } finally {
    if (dbconnection) {
      await dbconnection.connection.close();
      console.log('Connection finished with DB 👋');
    }
  }

  return pokemonsData;
}

/**
 * Get pokemons data and store it in a database
 * @param   {String}  path                  Path where the data will be stored
 * @param   {Number}  initialPokemonNumber  Number of the first pokemon data that you want
 * @param   {Number}  finalPokemonNumber    Number of the last pokemon data that you want element that triggered the tab
 * @param   {Number}  timeBetweenRequests   Number in ms to make requests to the server API
 * @returns {Array}   Return an array of objects with the pokemons data
 */
async function getPokemonsDataAndStoreInFs(path, initialPokemonNumber, finalPokemonNumber, timeBetweenRequests = 200) {
  let pokemonsData = [];

  try {
    pokemonsData = await PokemonManager.getPokemonsData(initialPokemonNumber, finalPokemonNumber, timeBetweenRequests);
    await PokemonCreator.createNewPokemonInFs(path, pokemonsData);
  } catch (err) {
    throw err;
  }

  return pokemonsData;
}

module.exports = { getPokemonsDataAndStoreInDb, getPokemonsDataAndStoreInFs };
