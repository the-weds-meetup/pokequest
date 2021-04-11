import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import filterPokemonById from '../modules/filterPokemonById';
import groupPokemonById from '../modules/groupPokemonById';

dotenv.config();
const POKEMON_URL = `${process.env.POKEMON_URL}`;
const TRAINER_POKEMON_URL = `${process.env.TRAINER_POKEMON_URL}`;

/**
 * @param _req : Request
 * @param _res : Response
 *
 * Get the count of pokemon in a trainer inventory
 * Optional parameter to filter by
 */
const groupInventoryById = async (
  _req: Request,
  _res: Response
): Promise<void> => {
  const { trainer_id, filter_pokemon } = _req.body;
  let isUserFault = false;

  try {
    // error handling
    if (!trainer_id) {
      isUserFault = true;
      throw { msg: 'Missing Trainer ID' };
    }

    const trainerPokemonCaught = groupPokemonById(
      await axios
        .get(TRAINER_POKEMON_URL + `/inventory/caught/${trainer_id}`)
        .then((response) => response.data.data)
    );

    console.log(trainerPokemonCaught);

    console.log(filter_pokemon);

    const pokemonCount =
      !filter_pokemon || filter_pokemon.length === 0
        ? trainerPokemonCaught
        : filterPokemonById(trainerPokemonCaught, filter_pokemon);

    console.log(pokemonCount);

    _res.status(201).send({
      time: Date.now(),
      data: {
        pokemon: pokemonCount,
      },
    });
  } catch (error) {
    console.log('[ADD_POKEMON]', error);
    if (isUserFault) {
      _res.status(500).send({
        time: Date.now(),
        server: 'complex_pokemon_management',
        msg: error.msg,
      });
    } else {
      _res.status(500).send({
        ...error.data,
      });
    }
  }
};

export default groupInventoryById;
