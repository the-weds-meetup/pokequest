import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { addPokemon, getPokemonCount, viewPokemon } from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9002;

app.use(express.json());
app.use(cors());

/**
 * ADD_POKEMON
 *
 * OBJECTIVE:
 * ADD POKEMON TO INVENTORY
 *   - add pokemon to a trainer inventory
 *   - add 6 random pokemon at one go
 *   - return 6 pokemon to be displayed
 */

// accept a mission

app.get('/', (req, res) => res.send('Complex POKEMON_ADD Microservice'));

// add a pokemon to inventory
app.post('/pokemon/add', addPokemon);

// show all pokemon by user with the status 'caught'
app.get('/pokemon/caught', viewPokemon);

// show all count of pokemon by user with the status 'caught'
app.get('/pokemon/inventory/count', getPokemonCount);

app.listen(PORT, async () => {
  console.log(
    `💪[server]: Pokemon_ADD is running at https://localhost:${PORT}`
  );
});
