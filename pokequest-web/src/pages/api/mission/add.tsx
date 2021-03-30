import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req, res) => {
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
      console.log('created');
      res.status(201).send('OK');
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  }
};
