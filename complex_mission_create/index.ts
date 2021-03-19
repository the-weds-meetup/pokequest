import dotenv from 'dotenv';
import express from 'express';

import { addMission, getAllPokemon } from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

// get missions and their information

app.get('/', (req, res) => res.send('Complex Pokemons Microservice'));

// get all pokemon available
app.get('/pokemon', getAllPokemon);

// create a mission and add the pokemons
app.post('/mission/add', addMission);

app.listen(PORT, async () => {
  console.log(
    `⚡️[server]: Microservice Request Mission is running at https://localhost:${PORT}`
  );
});
