import dotenv from 'dotenv';
import express from 'express';

import { getMissionTrainers, getTrainerMission, joinMission } from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8003;

app.use(express.json());

app.get('/', (req, res) => res.send('Mission Pokemons Microservice'));

app.get('/quest/trainer/:trainer', getTrainerMission);
app.get('/quest/mission/:mission', getMissionTrainers);
app.post('/quest', joinMission);

app.listen(PORT, async () => {
  console.log(
    `⚡️[server]: Mission Pokemon Server is running at https://localhost:${PORT}`
  );
});
