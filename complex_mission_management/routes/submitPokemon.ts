import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { groupPokemonById } from '../modules';

dotenv.config();
const TRAINER_POKEMON_URL = `${process.env.TRAINER_POKEMON_URL}`;
const TRAINER_POKEMON_MISSION_URL = `${process.env.TRAINER_MISSION_POKEMON_URL}`;

/**
 * @param _req : Request
 * @param _res : Response
 *
 * Get the available missions which are currently subscribed by the user
 * Returns the mission information
 */
const submitPokemon = async (_req: Request, _res: Response): Promise<void> => {
  // link mission to user_id
  const { mission_id } = _req.params;
  const { pokemon_list, trainer_id } = _req.body;
  // pokemon_list: {pokemon_id: count}
  const type = 'mission';
  let isUserFault = false;

  try {
    // ensure the variables exists
    if (!trainer_id) {
      isUserFault = true;
      throw { msg: 'Missing Trainer ID' };
    } else if (Object.keys(pokemon_list).length === 0) {
      isUserFault = true;
      throw { msg: 'Pokemon List empty' };
    }

    const pokemon_list_keys = Object.keys(pokemon_list);

    // get the trainer inventory count, group by pokemon_id
    const inventoryCaught = await axios
      .get(TRAINER_POKEMON_URL + `/inventory/caught/${trainer_id}`)
      .then((response) => response.data.data);

    const inventorySort = groupPokemonById(inventoryCaught);

    const pokemonSent = await Promise.all(
      pokemon_list_keys.map(async (key) => {
        let count = pokemon_list[key];

        // ensures that pokemon id exist in user inventory
        if (typeof inventorySort[key] !== 'undefined') {
          // handle if user input more pokemon than what the database holds
          if (count > inventorySort[key].count) {
            count = inventorySort[key].count;
          }

          // loop through the inventory of consisting of pokemon of that id
          // and update their status until count finishes
          return inventorySort[key].inventory.slice(0, count);
        }
        return [];
      })
    ).catch(() => {
      isUserFault = true;
      throw { msg: 'You broke it, that is unexpected ' };
    });

    console.log('What will be send', pokemonSent);

    await Promise.all(
      pokemonSent.map(async (inventory_list) => {
        await Promise.all(
          inventory_list.map(async (inventory_id) => {
            await axios
              .post(TRAINER_POKEMON_URL + `/inventory/update/${inventory_id}`, {
                update_type: type,
              })
              .then(() => {
                axios.post(
                  TRAINER_POKEMON_MISSION_URL +
                    `/transfer/${mission_id}/${inventory_id}`
                );
              });
          })
        );
      })
    );

    _res.status(201).send({
      time: Date.now(),
      data: 'Updated',
    });
  } catch (error) {
    console.log('[MISSION_MANANGEMENT]', error);
    if (isUserFault) {
      _res.status(500).send({
        time: Date.now(),
        server: 'complex_mission_management',
        msg: error.msg,
      });
    } else {
      _res.status(500).send({
        ...error.data,
      });
    }
  }
};

export default submitPokemon;
