import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();
const randomCount = 6;
const POKEMON_URL = `${process.env.POKEMON_URL}`;
const TRAINER_POKEMON_URL = `${process.env.TRAINER_POKEMON_URL}`;

/**
 * @param _req : Request
 * @param _res : Response
 *
 * Get the available missions which are currently subscribed by the user
 * Returns the mission information
 */
const addPokemon = async (_req: Request, _res: Response): Promise<void> => {
  const { trainer_id } = _req.body;
  let isUserFault = false;

  try {
    // error handling
    if (!trainer_id) {
      isUserFault = true;
      throw { msg: 'Missing Trainer ID' };
    }

    // get 6 random pokemon from pokemon server
    const pokemonList = await axios
      .get(POKEMON_URL + `/pokemon/random/${randomCount}`)
      .then((response) => response.data.data);

    // add pokemon_id to trainer_pokemon
    await Promise.all(
      pokemonList.map(async (pokemon) => {
        const poke_id = pokemon.id;
        await axios.post(
          TRAINER_POKEMON_URL + `/inventory/add/${trainer_id}/${poke_id}`
        );
      })
    );

    _res.status(201).send({
      time: Date.now(),
      data: {
        pokemon: pokemonList,
      },
    });
  } catch (error) {
    console.log('[ADD_POKEMON]', error?.msg || error.response.data);
    if (isUserFault) {
      _res.status(500).send({
        time: Date.now(),
        server: 'complex_pokemon_management',
        msg: error.msg,
      });
    } else {
      _res.status(500).send({
        ...error.response.data,
      });
    }
  }
};

export default addPokemon;
