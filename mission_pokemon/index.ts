import dotenv from 'dotenv';
import express from 'express';

import { addPokemonToMission, getMissionPokemon } from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8002;

app.use(express.json());

app.get('/', (req, res) => res.send('Mission Pokemons Microservice'));

app.post('/addPokemon', addPokemonToMission);

app.get('/getPokemon', getMissionPokemon);

app.listen(PORT, async () => {
  console.log(
    `⚡️[server]: Mission Pokemon Server is running at https://localhost:${PORT}`
  );
});
