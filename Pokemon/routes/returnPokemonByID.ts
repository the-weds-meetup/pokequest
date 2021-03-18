import { Request, Response } from 'express';

const returnPokemonByID = (
  _req: Request,
  _res: Response,
  POKEMON: Record<string, unknown>
): void => {
  if (POKEMON === undefined) {
    _res.status(500).send('No Pokemon');
  } else {
    const { id } = _req.params;
    const pokemon = POKEMON[id];

    // a postive integer
    if (pokemon) {
      _res.status(201).send({
        time: Date.now(),
        data: pokemon,
      });
    } else {
      _res.status(400).send({
        time: Date.now(),
        data: 'Invalid ID',
      });
    }
  }
};

export default returnPokemonByID;
