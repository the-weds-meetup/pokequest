import axios, { AxiosResponse } from 'axios';

const PokeApiURL = 'https://pokeapi.co/api/v2/pokemon/';

interface Pokemon {
  id?: number;
  name?: string;
  sprite?: string;
  offical_artwork?: string;
}

const getPokemonList = async (): Promise<Pokemon[]> => {
  const pokemonList = [];

  const pokemonAll = await axios
    .get(`${PokeApiURL}?limit=151`)
    .then((response: AxiosResponse) => response.data.results);

  for await (const pokemon of pokemonAll) {
    const name = pokemon.name;
    const pokemonData = await axios
      .get(pokemon.url)
      .then((response: AxiosResponse) => response.data);

    const pokeID = pokemonData.id;
    const frontSprite = pokemonData.sprites.front_default;
    const officialArtwork =
      pokemonData.sprites.other['official-artwork'].front_default;

    process.stdout.write(`${pokeID},`);

    pokemonList.push({
      id: pokeID,
      name: name,
      sprite: frontSprite,
      official_artwork: officialArtwork,
    });
  }

  console.log(`Fetched ${pokemonList.length} Pokemon!`);
  return pokemonList;
};

export default getPokemonList;
