import { Request, Response } from 'express';

const returnAvailablePokemon = (
  _req: Request,
  _res: Response,
  POKEMON: Record<string, unknown>
): void => {
  if (POKEMON === undefined) {
    _res.status(500).send({
      data: {
        msg: 'No Pokemon',
      },
    });
  } else {
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
  }
};

export default returnAvailablePokemon;
