const axios = require('axios');
const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon/';


async function getPokemonsData(initialPokemonNumber, finalPokemonNumber, timeBetweenRequests) {
  let pokemonData = [];

  // Check inputs format
  if (finalPokemonNumber - initialPokemonNumber < 0 || initialPokemonNumber <= 0 || finalPokemonNumber <= 0 || timeBetweenRequests < 0) {
    console.log('❌ Error in input data, please check your data');
    return pokemonData;
  }

  // Iterate and get data
  for (let i = initialPokemonNumber; i <= finalPokemonNumber; i++) {
    try {
      let pokemonResponse = await axios.get(POKE_API_URL + i);
      console.log(`-- Successful fetch data of ${pokemonResponse.data.name} ✅`);
      pokemonData.push(parsePokemonData(pokemonResponse.data))
    } catch (err) {
      console.log('❌ Error fetching pokemon data from API: ' + err);
    }
    await sleep(timeBetweenRequests);
  }

  return pokemonData;
}

//  #### Auxiliary Functions ###  //

function parsePokemonData(rawDataObject) {
  let pokemonParsedData = {
    id: rawDataObject.id,
    name: rawDataObject.name,
    height: rawDataObject.height,
    weight: rawDataObject.weight,
    frontImg: rawDataObject.sprites.front_default,
    backImg: rawDataObject.sprites.back_default,
    stats: rawDataObject.stats
  };

  return pokemonParsedData;
}

// Sleep with promises
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));


module.exports = { getPokemonsData };
