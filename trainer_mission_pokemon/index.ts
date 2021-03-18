import dotenv from 'dotenv';
import express from 'express';

import { showTransferredPokemon, submitPokemon } from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8004;

app.use(express.json());

app.get('/', (req, res) => res.send('Trainer Pokemons Microservice'));

app.post('/transfer/:mission_id/:pokemon_id', submitPokemon);

// useful to get a count of overall pokemon from a mission
app.get('/transfer/:mission_id', showTransferredPokemon);

app.listen(PORT, async () => {
  console.log(
    `⚡️[server]: Mission Trainer's Pokemon Server is running at https://localhost:${PORT}`
  );
});
