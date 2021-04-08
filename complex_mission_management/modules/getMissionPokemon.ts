import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const MISSION_POKEMON_URL = `${process.env.MISSION_POKEMON_URL}`;

const getMissionPokemon = async (mission_id: number): Promise<number[]> => {
  return await axios
    .get(MISSION_POKEMON_URL + `/get`, {
      data: { mission_id: mission_id },
    })
    .then((response) => {
      const rows = response.data.data;
      return rows.map((row) => row.pokemon_id);
    });
};

export default getMissionPokemon;
