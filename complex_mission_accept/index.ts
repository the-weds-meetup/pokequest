import dotenv from 'dotenv';
import express from 'express';

import { acceptMission } from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9002;

app.use(express.json());

/**
 * MISSION_ACCEPT
 *
 * OBJECTIVE:
 * ACCEPT A MISSION
 *   - link trainer to mission
 */

// accept a mission

app.get('/', (req, res) => res.send('Complex MISSION_ACCEPT Microservice'));

// sign up for a mission
app.post('/mission/:mission_id/', acceptMission);

app.listen(PORT, async () => {
  console.log(
    `⚡️[server]: Microservice Mission View is running at https://localhost:${PORT}`
  );
});
