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
  const { trainer_id, trainer_name } = _req.body;
  let isUserFault = false;

  try {
    // error handling
    if (!trainer_id) {
      isUserFault = true;
      throw { msg: 'Missing Trainer ID' };
    } else if (!trainer_name) {
      isUserFault = true;
      throw { msg: 'Missing Trainer Name' };
    }

    // check if mission is not over yet
    // if end_time is >= the time now, it is over
    await axios.get(MISSION_URL + `/mission/${mission_id}`).then((response) => {
      const mission = response.data.data;
      if (Date.now() >= mission.end_time) {
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
      time: Date.now(),
      data: 'Created',
    });
  } catch (error) {
    if (isUserFault) {
      console.log('[COMPLEX MISSION ACCEPT]', error.msg);
      _res.status(500).send({
        time: Date.now(),
        server: 'complex_mission_management',
        msg: error.msg,
      });
    } else {
      console.log('[COMPLEX MISSION ACCEPT]', error.response.data);
      _res.status(500).send({
        ...error.response.data,
      });
    }
  }
};

export default acceptMission;
