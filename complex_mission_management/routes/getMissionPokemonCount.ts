import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { getPokemon, groupPokemonById } from '../modules';

dotenv.config();
const TRAINER_MISSION_POKEMON_URL = `${process.env.TRAINER_MISSION_POKEMON_URL}`;
const TRAINER_POKEMON_URL = `${process.env.TRAINER_POKEMON_URL}`;
const MISSION_POKEMON_URL = `${process.env.MISSION_POKEMON_URL}`;

const getPokemonCount = async (
  _req: Request,
  _res: Response
): Promise<void> => {
  const { mission_id } = _req.params;
  const inventory_count: { pokemon: any; count: number }[] = [];

  try {
    // get all transferred pokemon in the related mission from the database
    const pokemon_inventory_id = await axios
      .get(TRAINER_MISSION_POKEMON_URL + `/transfer/${mission_id}`)
      .then((response) => response.data.data);

    const mission_pokemon = await axios
      .get(MISSION_POKEMON_URL + '/getPokemon', {
        data: {
          mission_id: mission_id,
        },
      })
      .then((response) => {
        const poke_list = response.data.data;
        return poke_list.map((pokemon) => pokemon.pokemon_id);
      });

    const mission_pokemon_count = groupPokemonById(
      await Promise.all(
        pokemon_inventory_id.map(async (inventory) => {
          const inventory_id = inventory.trainer_pokemon_id;
          return await axios
            .get(TRAINER_POKEMON_URL + `/inventory/info/id/${inventory_id}`)
            .then((response) => response.data.data);
        })
      )
    );

    // Add the pokemon information to the count
    await Promise.all(
      mission_pokemon.map(async (poke_id) => {
        const pokemon = await getPokemon(poke_id);

        // if not inside, count is set to 0
        const count = mission_pokemon_count[poke_id]
          ? mission_pokemon_count[poke_id].count
          : 0;

        // add to object
        inventory_count.push({
          pokemon: pokemon,
          count: count,
        });
      })
    ).then(() => {
      _res.status(201).send({
        date: Date.now(),
        data: inventory_count,
      });
    });
  } catch (error) {
    console.log('[COMPLEX MISSION VIEW]', error);
    _res.status(500).send({
      date: Date.now(),
      data: error,
    });
  }
};

export default getPokemonCount;
