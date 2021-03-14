import { Request, Response } from 'express';

interface Pokemon {
  id?: number;
  name?: string;
  sprite?: string;
  offical_artwork?: string;
}

const returnAvailablePokemon = (
  _req: Request,
  _res: Response,
  POKEMON: Pokemon[]
): void => {
  if (POKEMON === undefined) {
    _res.status(500).send('No Pokemon');
  } else {
    _res.status(200).send({
      time: Date.now(),
      size: POKEMON.length,
      data: POKEMON,
    });
  }
};

export default returnAvailablePokemon;
