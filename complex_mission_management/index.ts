import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import {
  acceptMission,
  getMissionInformation,
  getMissionsAvailable,
  getMissionsSubscribed,
  submitPokemon,
} from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9001;

app.use(express.json());
app.use(cors());

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
 *
 * =================================
 * MISSION_ACCEPT
 *
 * OBJECTIVE:
 * ACCEPT A MISSION
 *   - link trainer to mission
 */

// get missions and their information

app.get('/', (req, res) => res.send('MISSION_MANAGEMENT Microservice'));

// get all mission available, not subscribed by the user: array
app.get('/mission/available/:user_id', getMissionsAvailable);

// sign up for a mission
app.post('/mission/signup/:mission_id/', acceptMission);

// get a mission's pokemons
app.get('/mission/info/:mission_id', getMissionInformation);

// get currently subscribed missions: array
app.get('/mission/subscribe/:user_id', getMissionsSubscribed);

// get completed missions: array
app.get('/mission/complete/:user_id', getMissionsSubscribed);

// submit pokemon to mission
app.post('/mission/submit/:mission_id', submitPokemon);

app.listen(PORT, async () => {
  console.log(
    `💪[server]: MISSION_MANAGEMENT is running at https://localhost:${PORT}`
  );
});
