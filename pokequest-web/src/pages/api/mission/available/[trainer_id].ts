import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req, res) => {
  if (req.method === 'GET') {
    const { trainer_id } = req.query;

    try {
      const missions = await getMissions(trainer_id);

      console.log('here you go');

      res.status(201).send({
        available: missions,
      });
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  }
};

const getMissions = async (trainer_id: string) => {
  return await axios
    .get(process.env.MISSION_MANAGEMENT + `/mission/available/${trainer_id}`)
    .then((response) => response.data.data)
    .catch((error) => {
      console.log(error, 'Unable to get available missions');
      return [];
    });
};
