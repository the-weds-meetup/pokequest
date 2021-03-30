import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { addMission, getAllPokemon } from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

// get missions and their information

app.get('/', (req, res) => res.send('MISSION_MANAGEMENT (admin) Microservice'));

// get all pokemon available
app.get('/pokemon', getAllPokemon);

// create a mission and add the pokemons
app.post('/mission/add', addMission);

app.listen(PORT, async () => {
  console.log(
    `⚡💪[server]: MISSION_MANAGEMENT (admin) is running at https://localhost:${PORT}`
  );
});
