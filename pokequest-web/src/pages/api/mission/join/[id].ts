import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { id } = req.query;

    try {
      await axios.post(
        process.env.MISSION_MANAGEMENT + `/mission/signup/${id}`,
        req.body
      );
      console.log('[WEB: mission/join/:id]: joined');
      res.status(201).send('OK');
    } catch (error) {
      console.log('[WEB: mission/join/:id]', error.response.data);
      res.status(418).send(error.response.data);
    }
  }
};

export default handler;
