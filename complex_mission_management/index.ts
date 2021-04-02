import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import {
  acceptMission,
  getMissionInformation,
  getMissionPokemonCount,
  getMissionsAvailable,
  getMissionsComplete,
  getMissionsFuture,
  getMissionsNow,
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
app.get('/mission/info/pokemon/:mission_id', getMissionInformation);

// get a mission's submitted pokemon count
app.get('/mission/info/count/:mission_id', getMissionPokemonCount);

// get currently subscribed missions happening now: array
app.get('/mission/now/:user_id', getMissionsNow);

// get currently subscribed missions happening in the future: array
app.get('/mission/soon/:user_id', getMissionsFuture);

// get completed missions: array
app.get('/mission/complete/:user_id', getMissionsComplete);

// submit pokemon to mission
app.post('/mission/submit/:mission_id', submitPokemon);

app.listen(PORT, async () => {
  console.log(
    `💪[server]: MISSION_MANAGEMENT is running at https://localhost:${PORT}`
  );
});
