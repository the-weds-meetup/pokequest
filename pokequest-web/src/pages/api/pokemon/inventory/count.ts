import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { trainer_id, filter_pokemon } = req.body;

    try {
      const pokemon = await axios
        .get(process.env.POKEMON_MANAGEMENT + `/pokemon/inventory/count`, {
          data: {
            trainer_id,
            filter_pokemon,
          },
        })
        .then((response) => response.data.data);

      res.status(201).send({
        available: pokemon,
      });
    } catch (error) {
      console.log("Unable to get trainer's pokemon");
      console.log('[WEB: /pokemon/inventory/count]', error.response.data);
      res.status(418).send({ ...error.response.data, available: [] });
    }
  }
};

export default handler;
