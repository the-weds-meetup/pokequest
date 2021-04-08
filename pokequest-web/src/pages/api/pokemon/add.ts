import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { trainer_id } = req.body;

    try {
      const pokemon = await axios
        .post(process.env.POKEMON_MANAGEMENT + `/pokemon/add`, {
          trainer_id,
        })
        .then((response) => response.data.data.pokemon);
      res.status(201).send({ pokemon: pokemon });
      console.log('[WEB /[pokemon/add]: you add a pokemon');
    } catch (error) {
      console.log('[WEB]: /pokemon/add', error.response.data);
      res.status(418).send({ ...error.response.data, pokemon: [] });
    }
  }
};

export default handler;
