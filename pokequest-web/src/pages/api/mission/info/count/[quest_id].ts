import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req, res) => {
  if (req.method === 'GET') {
    const { quest_id } = req.query;

    try {
      const data = await axios
        .get(process.env.MISSION_MANAGEMENT + `/mission/info/count/${quest_id}`)
        .then((response) => response.data.data);
      console.log('get count');
      res.status(201).send(data);
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  }
};
