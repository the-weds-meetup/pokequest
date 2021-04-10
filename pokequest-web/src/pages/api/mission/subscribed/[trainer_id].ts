import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { trainer_id } = req.query;

    try {
      if (Array.isArray(trainer_id)) {
        throw {
          response: {
            data: {
              time: Date.now(),
              server_name: "User's Fault",
              msg: 'You should see this. How did you get here?',
            },
          },
        };
      }
      const ongoing = await getOngoingMissions(trainer_id);
      const future = await getFutureMissions(trainer_id);
      const completed = await getCompleteMissions(trainer_id);
      console.log(`[WEB: mission/join/:id]: 
        Hi ${trainer_id}
        Here are your accomplishments in life
          Ongoing ${ongoing.length}, 
          Future ${future.length},
          Completed ${completed.length}
        Congrats!
      `);

      res.status(201).send({
        ongoing: ongoing,
        future: future,
        completed: completed,
      });
    } catch (error) {
      console.log('[WEB: mission/join/:id]', error.response.data);
      res.status(418).send({
        ...error.response.data,
        ongoing: [],
        future: [],
        completed: [],
      });
    }
  }
};

const getOngoingMissions = async (trainer_id: string) => {
  return await axios
    .get(process.env.MISSION_MANAGEMENT + `/mission/now/${trainer_id}`)
    .then((response) => response.data.data)
    .catch((error) => {
      console.log('[WEB: /mission/subscribed (Ongoing)]', error.response.data);
      return [];
    });
};

const getFutureMissions = async (trainer_id: string) => {
  return await axios
    .get(process.env.MISSION_MANAGEMENT + `/mission/soon/${trainer_id}`)
    .then((response) => response.data.data)
    .catch((error) => {
      console.log('[WEB: /mission/subscribed (Future)]', error.response.data);
      return [];
    });
};

const getCompleteMissions = async (trainer_id: string) => {
  return await axios
    .get(process.env.MISSION_MANAGEMENT + `/mission/complete/${trainer_id}`)
    .then((response) => response.data.data)
    .catch((error) => {
      console.log(
        '[WEB: /mission/subscribed (Completed)]',
        error.response.data
      );
      return [];
    });
};

export default handler;
