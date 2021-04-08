import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();
const POKEMON_URL = `${process.env.POKEMON_URL}`;
const TRAINER_POKEMON_URL = `${process.env.TRAINER_POKEMON_URL}`;

/**
 * @param _req : Request
 * @param _res : Response
 *
 * Get all pokemon in the inventory which has the status 'caught'
 * Returns the mission information
 */
const viewPokemon = async (_req: Request, _res: Response): Promise<void> => {
  const { trainer_id } = _req.body;
  let isUserFault = false;

  try {
    // error handling
    if (!trainer_id) {
      isUserFault = true;
      throw { msg: 'Missing Trainer ID' };
    }

    const trainerPokemonCaught = await axios
      .get(TRAINER_POKEMON_URL + `/inventory/caught/${trainer_id}`)
      .then((response) => response.data.data);

    // get more detailed information about pokemon caught
    const pokemonCaught = await Promise.all(
      trainerPokemonCaught.map(async (trainerPokemon) => {
        const poke_id = trainerPokemon.pokemon_id;

        // get pokemon information
        const pokemon = await axios
          .get(POKEMON_URL + `/pokemon/${poke_id}`)
          .then((response) => response.data.data);

        /**
         * return {
            poke_id: number,
            poke_name: string,
            poke_official_artwork: string,
            poke_sprite: string,
            inventory_id: number,
          }
        */
        return {
          ...pokemon,
          inventory_id: trainerPokemon.id,
        };
      })
    );

    _res.status(201).send({
      time: Date.now(),
      data: {
        pokemon: pokemonCaught,
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

export default viewPokemon;
