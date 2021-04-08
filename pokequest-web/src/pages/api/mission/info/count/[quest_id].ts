import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { quest_id } = req.query;

    try {
      const data = await axios
        .get(process.env.MISSION_MANAGEMENT + `/mission/info/count/${quest_id}`)
        .then((response) => response.data.data);
      res.status(201).send(data);
    } catch (error) {
      console.log('[WEB: mission/info/count/:quest_id ]', error.response.data);
      res.status(418).send(error.response.data);
    }
  }
};

export default handler;
