import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req, res) => {
  if (req.method === 'POST') {
    const { quest_id } = req.query;
    const { trainer_id, pokemon_list } = req.body;

    console.log(req.body);

    try {
      await axios.post(
        process.env.MISSION_MANAGEMENT + `/mission/submit/${quest_id}`,
        {
          trainer_id: trainer_id,
          pokemon_list: pokemon_list,
        }
      );
      res.status(201).send('OK');
      console.log('send');
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  }
};
