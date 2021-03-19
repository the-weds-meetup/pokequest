import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { getMissionPokemon, getPokemon } from '../modules';

dotenv.config();
const MISSION_URL = `${process.env.MISSION_URL}`;
const TRAINER_MISSION_URL = `${process.env.TRAINER_MISSION_URL}`;

/**
 * @param _req : Request
 * @param _res : Response
 *
 * Get the available missions which are currently not subscribed by the user
 * Returns the mission information
 */
const getMissionsComplete = async (
  _req: Request,
  _res: Response
): Promise<void> => {
  const { user_id } = _req.params;

  // get all the ongoing missions
  try {
    // return only the id of the missions by the user
    const trainerMissionList: number[] = await axios
      .get(TRAINER_MISSION_URL + `/quest/trainer/${user_id}`)
      .then((response) => {
        return response.data.data.map((mission) => mission.mission_id);
      });

    // get all the ongoing mission and only find those which matches the mission_id gotten previously
    const ongoingMissionList = await axios
      .get(MISSION_URL + '/mission/complete')
      .then((response) => {
        return response.data.data.filter((mission) => {
          return trainerMissionList.includes(mission.id);
        });
      });

    // update the ongoingMissionInfo with Pokemon Names
    const ongoing = await Promise.all(
      ongoingMissionList.map(async (mission) => {
        const mission_id = mission.id;
        const pokemon_id_list = await getMissionPokemon(mission_id);
        const pokemon = await Promise.all(
          pokemon_id_list.map(async (poke_id) => await getPokemon(poke_id))
        );
        return {
          ...mission,
          pokemon: pokemon,
        };
      })
    );

    _res.status(201).send({
      date: Date.now(),
      data: ongoing,
    });
  } catch (error) {
    console.log('[COMPLES MISSION VIEW]', error);
    _res.send(500).send({
      date: Date.now(),
      data: error,
    });
  }
};

export default getMissionsComplete;
