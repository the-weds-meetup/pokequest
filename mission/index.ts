import dotenv from 'dotenv';
import express from 'express';

import { addMission, getAllMissions } from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());

app.get('/', (req, res) => res.send('Missions Microservice'));

app.get('/mission', getAllMissions);

app.post('/mission', addMission);

app.listen(PORT, async () => {
  console.log(
    `⚡️[server]: Mission Server is running at https://localhost:${PORT}`
  );
});
