import dotenv from 'dotenv';
import express from 'express';

import {
  getMissionInformation,
  getMissionsAvailable,
  getMissionsSubscribed,
} from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9001;

app.use(express.json());

/**
 * MISSION_VIEW
 *
 * OBJECTIVE:
 * View all the available missions ( to sign up )
 *   - see pokemon needed
 *   - see mission start time and end time
 *
 * To view all currently subscribed missions (per user)
 *   - see pokemon needed
 *   - see mission start time and end time
 *   ! submission of pokemon will be through another microservice
 *
 * To view completed missions (per user)
 *   - see mission start time and end time
 *   - see pokemon needed
 */

// get missions and their information

app.get('/', (req, res) => res.send('Complex MISSION_VIEW Microservice'));

// get a mission's pokemons
app.get('/mission/:mission_id', getMissionInformation);

// get all mission available, not subscribed by the user: array
app.get('/mission/available/:user_id', getMissionsAvailable);

// get currently subscribed missions: array
app.get('/mission/subscribe/:user_id', getMissionsSubscribed);

// get completed missions: array
app.get('/mission/complete/:user_id', getMissionsSubscribed);

app.listen(PORT, async () => {
  console.log(
    `⚡️[server]: Microservice Mission View is running at https://localhost:${PORT}`
  );
});
