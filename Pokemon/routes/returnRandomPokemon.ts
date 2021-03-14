import { Request, Response } from 'express';

interface Pokemon {
  id?: number;
  name?: string;
  sprite?: string;
  offical_artwork?: string;
}

// get a random pokemon from the list
const getRandomPokemon = (POKEMON: Pokemon[]): Pokemon => {
  const size = POKEMON.length;
  const randomInt = Math.floor(Math.random() * size);
  return POKEMON[randomInt];
};

// returns an array of one to many pokemon
const returnMultipleRandomPokemon = (
  _req: Request,
  _res: Response,
  POKEMON: Pokemon[]
): void => {
  const { count } = _req.params;
  const size = parseInt(count);
  const pokemonList = [];

  for (let index = 0; index < size; index++) {
    pokemonList.push(getRandomPokemon(POKEMON));
  }

  if (pokemonList.length > 0) {
    _res.status(200).send({
      time: Date.now(),
      data: pokemonList,
    });
  } else {
    _res.status(400).send({
      time: Date.now(),
      data: 'Invalid ID',
    });
  }
};

export default returnMultipleRandomPokemon;
