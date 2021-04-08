import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const pokemon_list = await axios
        .get(process.env.MISSION_MANAGEMENT_ADMIN + '/pokemon')
        .then((res) => res.data.pokemon);

      res.status(201).send({
        pokemon: pokemon_list,
      });
      console.log('here is every pokemon');
    } catch (error) {
      console.log('[WEB]: /pokemon/all', error.response.data);
      res.status(418).send(error.response.data);
    }
  }
};

export default handler;
