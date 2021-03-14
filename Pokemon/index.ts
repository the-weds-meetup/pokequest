import dotenv from 'dotenv';
import express from 'express';

import { getPokemonList } from './modules';
import {
  returnAvailablePokemon,
  returnMultipleRandomPokemon,
  returnPokemonByID,
} from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

interface Pokemon {
  id?: number;
  name?: string;
  sprite?: string;
  offical_artwork?: string;
}

// load pokemon list
let POKEMON: Pokemon[] | [];

app.get('/', (req, res) => res.send('Pokemon Microservice'));

app.get('/pokemon', (req, res) => {
  returnAvailablePokemon(req, res, POKEMON);
});

app.get('/pokemon/:id', (req, res) => {
  returnPokemonByID(req, res, POKEMON);
});

app.get('/pokemon/random/:count', (req, res) => {
  returnMultipleRandomPokemon(req, res, POKEMON);
});

app.listen(PORT, async () => {
  POKEMON = await getPokemonList().catch(() => {
    console.log('An error occured when fetching');
    return [];
  });

  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
