import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { getPokemon } from '../modules';

dotenv.config();
const MISSION_URL = `${process.env.MISSION_URL}`;
const MISSION_POKEMON_URL = `${process.env.MISSION_POKEMON_URL}`;

const getMissionInformation = async (
  _req: Request,
  _res: Response
): Promise<void> => {
  const { mission_id } = _req.params;

  try {
    // get the poke_id from mission_pokemon
    const pokemon_id_list = await axios
      .get(MISSION_POKEMON_URL + '/getPokemon', {
        data: {
          mission_id: mission_id,
        },
      })
      .then((response) => {
        // only get the poke_id out of the array object recieved
        return response.data.data.map((info) => {
          return info.pokemon_id;
        });
      });

    // get mission start and end time
    const mission_info = await axios
      .get(MISSION_URL + `/mission/${mission_id}`)
      .then((response) => {
        return response.data.data;
      });

    const pokemon_list = await Promise.all(
      pokemon_id_list.map(async (poke_id: number) => {
        return await getPokemon(poke_id);
      })
    );

    _res.status(201).send({
      time: Date.now(),
      data: {
        ...mission_info,
        pokemon: pokemon_list,
      },
    });
  } catch (error) {
    _res.status(500).send({
      msg: error.response.data,
    });
  }
};

export default getMissionInformation;
