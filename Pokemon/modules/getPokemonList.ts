import axios, { AxiosResponse } from 'axios';
import fs from 'fs';

const PokeApiURL = 'https://pokeapi.co/api/v2/pokemon/';
const PokeAvailURI = './constants/pokemon.json';

interface Pokemon {
  id?: number;
  name?: string;
  sprite?: string;
  offical_artwork?: string;
}

const getPokemonList = async (): Promise<Pokemon[]> => {
  const pokemonList = [];
  const pokemonAll = JSON.parse(fs.readFileSync(PokeAvailURI).toString());

  // const pokemonAll = await axios
  //   .get(`${PokeApiURL}?limit=151`)
  //   .then((response: AxiosResponse) => response.data.results);

  for await (const pokemon of pokemonAll) {
    const name = pokemon.name;
    const pokeId = pokemon.id;
    const pokemonData = await axios
      .get(PokeApiURL + pokeId)
      .then((response: AxiosResponse) => response.data);

    const frontSprite = pokemonData.sprites.front_default;
    const officialArtwork =
      pokemonData.sprites.other['official-artwork'].front_default;

    process.stdout.write(`${pokeId},`);

    pokemonList.push({
      id: pokeId,
      name: name,
      sprite: frontSprite,
      official_artwork: officialArtwork,
    });
  }

  console.log(`Fetched ${pokemonList.length} Pokemon!`);
  return pokemonList;
};

export default getPokemonList;
