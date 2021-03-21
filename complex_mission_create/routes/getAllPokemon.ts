import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();
const POKEMON_URL = `${process.env.POKEMON_URL}`;

const getAllPokemon = async (_req: Request, _res: Response): Promise<void> => {
  // create a mission at mission_url
  await axios
    .get(POKEMON_URL + '/pokemon')
    .then((response) => {
      const pokemon = response.data.data.pokemon;
      _res.status(201).send({
        time: Date.now(),
        pokemon: pokemon,
      });
    })
    .catch((error) => {
      _res.status(500).send({
        date: Date.now(),
        data: error.response.data.data,
      });
    });
};

export default getAllPokemon;
