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
  console.log(trainer_id);

  try {
    // error handling
    if (!trainer_id) {
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
      date: Date.now(),
      data: {
        pokemon: pokemonList,
      },
    });
  } catch (error) {
    console.log('[ADD_POKEMON]', error);
    _res.status(500).send({
      date: Date.now(),
      data: error,
    });
  }
};

export default addPokemon;
