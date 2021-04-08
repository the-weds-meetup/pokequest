import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { getPokemon, publishMessage } from '../modules';

dotenv.config();
const MISSION_URL = `${process.env.MISSION_URL}`;
const MISSION_POKEMON_URL = `${process.env.MISSION_POKEMON_URL}`;
let isServerFault = true;

const addMission = async (_req: Request, _res: Response): Promise<void> => {
  const { poke_array, start_time, end_time } = _req.body;

  try {
    if (!poke_array || poke_array.length === 0) {
      isServerFault = false;
      throw { msg: 'Missing Pokemon' };
    }
    if (!start_time || !end_time) {
      isServerFault = false;
      throw { msg: 'Missing timings' };
    }
    if (start_time < 0 || end_time < 0) {
      isServerFault = false;
      throw { msg: 'Missing timings' };
    }
    if (start_time >= end_time) {
      isServerFault = false;
      throw { msg: 'Incorrect timings' };
    }

    // add all the pokemon into the mission
    const success_pokemon: number[] = [];
    const missing_pokemon: number[] = [];

    // create a mission at mission_url
    const mission_id = await axios
      .post(MISSION_URL + '/mission', {
        start_time: start_time,
        end_time: end_time,
      })
      .then((response) => {
        return response.data.data.id;
      });

    // add inside array
    for await (const poke_id of poke_array) {
      await axios
        .post(MISSION_POKEMON_URL + '/add', {
          poke_id: poke_id,
          mission_id: mission_id,
        })
        .then(() => {
          success_pokemon.push(poke_id);
        })
        .catch((error) => {
          console.log(error.message);
          missing_pokemon.push(poke_id);
        });
    }

    const success_pokemon_list = await Promise.all(
      success_pokemon.map(async (poke_id: number) => {
        return await getPokemon(poke_id);
      })
    );

    const success_pokemon_names = success_pokemon_list.map(
      (pokemon) => pokemon.name
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
      publishMessage(mission_id, success_pokemon_names);
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
      throw { msg: 'Did not add Pokemon' };
    }
  } catch (error) {
    if (isServerFault) {
      console.log('MISSION_MANAGEMENT_ADMIN', error.response.data);
      _res.status(500).send({
        ...error.response.data,
      });
    } else {
      console.log('MISSION_MANAGEMENT_ADMIN', error.msg);
      _res.status(500).send({
        time: Date.now(),
        server: 'complex_mission_management_admin',
        msg: error.msg,
      });
    }
  }
};

export default addMission;
