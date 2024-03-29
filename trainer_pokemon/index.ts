import dotenv from 'dotenv';
import express from 'express';

import {
  addPokemon,
  getAllPokemon,
  getCaughtPokemon,
  getCaughtPokemonById,
  updatePokemonStatus,
} from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8004;

app.use(express.json());

app.get('/', (req, res) => res.send('Trainer Pokemons Microservice'));

app.get('/inventory/trainer/:trainer_id', getAllPokemon);
app.get('/inventory/id/:inventory_id', getCaughtPokemonById);
app.get('/inventory/caught/:trainer_id', getCaughtPokemon);
app.post('/inventory/add/:trainer_id/:pokemon_id', addPokemon);
app.post('/inventory/update/:inventory_id', updatePokemonStatus);

app.listen(PORT, async () => {
  console.log(
    `⚡️[server]: Trainer's Pokemon Server is running at https://localhost:${PORT}`
  );
});
