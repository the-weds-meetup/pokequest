import { Request, Response } from 'express';

const returnAvailablePokemon = (
  _req: Request,
  _res: Response,
  POKEMON: Record<string, unknown>
): void => {
  try {
    if (POKEMON === undefined) {
      throw { message: 'No Pokemon in database' };
    }
    const pokemon_list = [];
    for (const id in POKEMON) {
      pokemon_list.push(POKEMON[id]);
    }
    _res.status(200).send({
      time: Date.now(),
      data: {
        size: pokemon_list.length,
        pokemon: pokemon_list,
      },
    });
  } catch (error) {
    console.log('[POKEMON]:', error);
    _res.status(418).send({
      time: Date.now(),
      server: 'pokemon',
      msg: error.message,
    });
  }
};

export default returnAvailablePokemon;
