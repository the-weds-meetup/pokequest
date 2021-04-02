import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req, res) => {
  if (req.method === 'GET') {
    const { trainer_id } = req.query;

    try {
      const ongoing = await getOngoingMissions(trainer_id);
      const future = await getFutureMissions(trainer_id);
      const completed = await getCompleteMissions(trainer_id);
      console.log('here you go');

      res.status(201).send({
        ongoing: ongoing,
        future: future,
        completed: completed,
      });
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  }
};

const getOngoingMissions = async (trainer_id: string) => {
  return await axios
    .get(process.env.MISSION_MANAGEMENT + `/mission/now/${trainer_id}`)
    .then((response) => response.data.data)
    .catch((error) => {
      console.log(error, 'Unable to get ongoing subscribed missions');
      return [];
    });
};

const getFutureMissions = async (trainer_id: string) => {
  return await axios
    .get(process.env.MISSION_MANAGEMENT + `/mission/soon/${trainer_id}`)
    .then((response) => response.data.data)
    .catch((error) => {
      console.log(error, 'Unable to get future subscribed missions');
      return [];
    });
};

const getCompleteMissions = async (trainer_id: string) => {
  return await axios
    .get(process.env.MISSION_MANAGEMENT + `/mission/complete/${trainer_id}`)
    .then((response) => response.data.data)
    .catch((error) => {
      console.log(error, 'Unable to get completed subscribed missions');
      return [];
    });
};
