import { Request, Response } from 'express';

const returnPokemonByID = (
  _req: Request,
  _res: Response,
  POKEMON: Record<string, unknown>
): void => {
  const { id } = _req.params;
  const pokemon = POKEMON[id];

  try {
    if (POKEMON === undefined) {
      throw { message: 'No Pokemon in database' };
    }

    if (!pokemon) {
      throw { message: 'Invalid ID' };
    }

    _res.status(201).send({
      time: Date.now(),
      data: pokemon,
    });
  } catch (error) {
    _res.status(418).send({
      time: Date.now(),
      server: 'pokemon',
      msg: error.message,
    });
  }
};

export default returnPokemonByID;
