import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { getPokemon } from '../modules';

dotenv.config();
const MISSION_URL = `${process.env.MISSION_URL}`;
const MISSION_POKEMON_URL = `${process.env.MISSION_POKEMON_URL}`;

const addMission = async (_req: Request, _res: Response): Promise<void> => {
  const { poke_array, start_time, end_time } = _req.body;
  if (!poke_array || poke_array.length === 0) {
    _res.status(401).send({
      data: 'Missing pokemon',
    });
  } else if (!start_time || !end_time) {
    _res.status(401).send({
      data: 'Missing timings',
    });
  }

  // create a mission at mission_url
  const mission_id = await axios
    .post(MISSION_URL + '/mission', {
      data: {
        start_time: start_time,
        end_time: end_time,
      },
    })
    .then((response) => {
      return response.data.data.id;
    })
    .catch((error) => {
      _res.status(500).send({
        data: error.response.data,
      });
    });

  // add all the pokemon into the mission
  const success_pokemon: number[] = [];
  const missing_pokemon: number[] = [];

  for await (const poke_id of poke_array) {
    await axios
      .post(MISSION_POKEMON_URL + '/addPokemon', {
        data: {
          poke_id: poke_id,
          mission_id: mission_id,
        },
      })
      .then(() => {
        success_pokemon.push(poke_id);
      })
      .catch((error) => {
        console.log(error.message);
        missing_pokemon.push(poke_id);
      });
  }

  console.log(success_pokemon, poke_array, missing_pokemon);

  const success_pokemon_list = await Promise.all(
    success_pokemon.map(async (poke_id: number) => {
      return await getPokemon(poke_id);
    })
  );

  // return results
  if (success_pokemon.length === poke_array.length) {
    _res.status(201).send({
      time: Date.now(),
      data: {
        msg: 'Added successfully',
        pokemon: success_pokemon_list,
      },
    });
  } else if (
    success_pokemon.length > 0 &&
    success_pokemon.length < poke_array.length
  ) {
    _res.status(201).send({
      time: Date.now(),
      data: {
        msg: 'Some Pokemon not added',
        pokemon: success_pokemon_list,
      },
    });
  } else {
    _res.status(500).send({
      time: Date.now(),
      data: {
        msg: 'Did not add Pokemon',
      },
    });
  }
};

export default addMission;
