import axios, { AxiosResponse } from 'axios';
import fs from 'fs';

const PokeApiURL = 'https://pokeapi.co/api/v2/pokemon/';
const PokeAvailURI = './constants/pokemon.json';

interface Pokemon {
  id?: number;
  name?: string;
  sprite?: string;
  official_artwork?: string;
}

const getPokemonList = async (): Promise<Record<number, Pokemon>> => {
  const pokemonList: Record<string, Pokemon> = {};
  const pokemonAll = JSON.parse(fs.readFileSync(PokeAvailURI).toString());
  let count = 0;

  // const pokemonAll = await axios
  //   .get(`${PokeApiURL}?limit=151`)
  //   .then((response: AxiosResponse) => response.data.results);

  for await (const pokemon of pokemonAll) {
    const name: string = pokemon.name;
    const pokeId: number = pokemon.id;
    const pokemonData = await axios
      .get(PokeApiURL + pokeId)
      .then((response: AxiosResponse) => response.data);

    const frontSprite = pokemonData.sprites.front_default;
    const officialArtwork =
      pokemonData.sprites.other['official-artwork'].front_default;

    process.stdout.write(`${pokeId},`);

    pokemonList[`${pokeId}`] = {
      id: pokeId,
      name: name,
      sprite: frontSprite,
      official_artwork: officialArtwork,
    };
    count++;
  }

  console.log(`Fetched ${count} Pokemon!`);
  return pokemonList;
};

export default getPokemonList;
