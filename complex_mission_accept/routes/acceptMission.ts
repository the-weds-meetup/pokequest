import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();
const MISSION_URL = `${process.env.MISSION_URL}`;
const TRAINER_MISSION_URL = `${process.env.TRAINER_MISSION_URL}`;

/**
 * @param _req : Request
 * @param _res : Response
 *
 * Get the available missions which are currently subscribed by the user
 * Returns the mission information
 */
const acceptMission = async (_req: Request, _res: Response): Promise<void> => {
  // link mission to user_id
  const { mission_id } = _req.params;
  console.log(_req.body);
  const { trainer_id, trainer_name } = _req.body;

  try {
    // error handling
    if (!trainer_id) {
      throw { msg: 'Missing Trainer ID' };
    } else if (!trainer_name) {
      throw { msg: 'Missing Trainer Name' };
    }

    // check if mission is not over yet
    // if end_time is >= the time now, it is over
    await axios.get(MISSION_URL + `/mission/${mission_id}`).then((response) => {
      const mission = response.data.data;
      if (mission.end_time >= Date.now()) {
        throw { msg: 'Too late' };
      }
    });

    // create a record in TRAINER_MISSION
    await axios
      .post(TRAINER_MISSION_URL + `/quest`, {
        mission_id: mission_id,
        trainer_id: trainer_id,
        trainer_name: trainer_name,
      })
      .then((response) => response.data.data);

    _res.status(201).send({
      date: Date.now(),
      data: 'Created',
    });
  } catch (error) {
    console.log('[COMPLEX MISSION JOIN]', error);
    _res.send(500).send({
      date: Date.now(),
      data: error,
    });
  }
};

export default acceptMission;
