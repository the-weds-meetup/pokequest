import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { poke_array, start_time, end_time } = req.body;

    const payload = {
      poke_array,
      start_time: Date.parse(start_time),
      end_time: Date.parse(end_time),
    };

    try {
      await axios.post(
        process.env.MISSION_MANAGEMENT_ADMIN + '/mission/add',
        payload
      );
      res.status(201).send('OK');
      console.log('[WEB: mission/add/]: created');
    } catch (error) {
      console.log('[WEB: mission/add/]', error.response.data);
      res.status(418).send(error.response.data);
    }
  }
};

export default handler;
