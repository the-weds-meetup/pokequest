import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const POKEMON_URL = `${process.env.POKEMON_URL}`;

interface Pokemon {
  id?: number;
  name?: string;
  sprite?: string;
  official_artwork?: string;
}

const getPokemon = async (poke_id: number): Promise<Pokemon> => {
  return await axios
    .get(POKEMON_URL + `/pokemon/${poke_id}`)
    .then((response) => response.data.data)
    .catch((error) => error.response);
};

export default getPokemon;
