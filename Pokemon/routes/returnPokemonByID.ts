import { Request, Response } from 'express';

interface Pokemon {
  id?: number;
  name?: string;
  sprite?: string;
  offical_artwork?: string;
}

const returnPokemonByID = (
  _req: Request,
  _res: Response,
  POKEMON: Pokemon[]
): void => {
  if (POKEMON === undefined) {
    _res.status(500).send('No Pokemon');
  } else {
    const { id } = _req.params;
    const pokemon = POKEMON[parseInt(id) - 1];

    // a postive integer
    if (pokemon) {
      _res.status(200).send({
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
