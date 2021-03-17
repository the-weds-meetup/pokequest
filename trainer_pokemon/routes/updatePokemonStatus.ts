import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Client } from 'pg';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const port = parseInt(`${process.env.DATABASE_PORT}`) || 5432;

const connectionString = isProduction
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: port,
    };

const updatePokemonStatus = async (_req: Request, _res: Response): Promise<void> => {
  const { pokemon_id } = _req.params;
  const { update_type } = _req.body;

  if (!update_type) {
    _res.status(401).send('Missing Types');
  }

  if (update_type !== 'mission' || update_type !== 'released') {
    _res.status(401).send('Incorrect Types');
  }

  const query = {
    text:
      'UPDATE trainer_pokemon SET status = $1 WHERE id = $2',
    values: [update_type, pokemon_id],
  };

  const client = new Client(connectionString);
  await client.connect();

  await client
    .query(query)
    .then((results) => {
      _res.status(201).send({time: Date.now()});
    })
    .catch((error) => {
      console.log(error);
      _res.status(418).send('Server Error');
    })
    .finally(() => client.end());
};

export default updatePokemonStatus;
