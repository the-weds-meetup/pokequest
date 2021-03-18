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

const submitPokemon = async (_req: Request, _res: Response): Promise<void> => {
  const { mission_id, pokemon_id } = _req.params;

  const query = {
    text:
      'INSERT INTO mission_trainer_pokemon(mission_id, trainer_pokemon_id, received_time) VALUES($1, $2, $3)',
    values: [mission_id, pokemon_id, Date.now()],
  };

  const client = new Client(connectionString);
  await client.connect();

  await client
    .query(query)
    .then(() => {
      _res.status(201).send({ time: Date.now() });
    })
    .catch((error) => {
      console.log(error);
      _res.status(418).send('[Mission_Trainer_Pokemon] Server Error');
    })
    .finally(() => client.end());
};

export default submitPokemon;
