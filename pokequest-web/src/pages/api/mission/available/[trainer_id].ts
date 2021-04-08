import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { trainer_id } = req.query;

    try {
      const missions = await await axios
        .get(
          process.env.MISSION_MANAGEMENT + `/mission/available/${trainer_id}`
        )
        .then((response) => response.data.data);

      res.status(201).send({
        available: missions,
      });
      console.log('[WEB: mission/available/:trainer_id]: Much Wow');
    } catch (error) {
      console.log('[WEB: mission/available/:trainer_id]', error.response.data);
      res.status(418).send({
        ...error.response.data,
        available: [],
      });
    }
  }
};

export default handler;
