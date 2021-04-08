import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { quest_id } = req.query;
    const { trainer_id, pokemon_list } = req.body;

    try {
      await axios.post(
        process.env.MISSION_MANAGEMENT + `/mission/submit/${quest_id}`,
        {
          trainer_id: trainer_id,
          pokemon_list: pokemon_list,
        }
      );
      res.status(201).send('OK');
      console.log('[WEB: mission/send/:quest_id]: send');
    } catch (error) {
      console.log('[WEB: mission/send/:quest_id]', error.response.data);
      res.status(418).send(error.response.data);
    }
  }
};

export default handler;
