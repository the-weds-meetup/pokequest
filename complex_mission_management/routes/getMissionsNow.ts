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
 * Get the available missions which are currently subscribed by the trainer
 * Returns the mission information
 */
const getMissionsNow = async (_req: Request, _res: Response): Promise<void> => {
  const { trainer_id } = _req.params;
  const date = Date.now();

  // get all the ongoing missions
  try {
    // return only the id of the missions by the trainer
    const trainerMissionList: number[] = await axios
      .get(TRAINER_MISSION_URL + `/quest/trainer/${trainer_id}`)
      .then((response) => {
        return response.data.data.map((mission) => mission.mission_id);
      });

    // get all the ongoing mission and only find those which matches the mission_id gotten previously
    const ongoingMissionList = await axios
      .get(MISSION_URL + '/mission/ongoing')
      .then((response) => {
        return response.data.data.filter((mission) => {
          return trainerMissionList.includes(mission.id);
        });
      })
      .then((allMissions) =>
        allMissions.filter((mission) => date >= mission.start_time)
      );

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
      time: Date.now(),
      data: ongoing,
    });
  } catch (error) {
    console.log('[COMPLEX MISSION VIEW NOW]', error.response.data);
    _res.status(500).send({
      ...error.response.data,
    });
  }
};

export default getMissionsNow;
