import dotenv from 'dotenv';
import express from 'express';

import { getAllPokemon, addPokemon, updatePokemonStatus } from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8004;

app.use(express.json());

app.get('/', (req, res) => res.send('Trainer Pokemons Microservice'));

app.get('/inventory/:trainer', getAllPokemon);
app.post('/inventory/:trainer/:pokemon', addPokemon);
app.post('/inventory/update/:pokemon_id', updatePokemonStatus);

app.listen(PORT, async () => {
  console.log(
    `⚡️[server]: Trainer's Pokemon Server is running at https://localhost:${PORT}`
  );
});
