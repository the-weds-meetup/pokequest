import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req, res) => {
  if (req.method === 'POST') {
    console.log(req.query);
    const { id } = req.query;

    try {
      await axios.post(
        process.env.MISSION_MANAGEMENT + `/mission/signup/${id}`,
        req.body
      );
      console.log('joined');
      res.status(201).send('OK');
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  }
};
