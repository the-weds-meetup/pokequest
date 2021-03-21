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

const addPokemon = async (_req: Request, _res: Response): Promise<void> => {
  const { trainer_id, pokemon_id } = _req.params;

  const query = {
    text:
      'INSERT INTO trainer_pokemon(trainer_id, pokemon_id, catch_time) VALUES($1, $2, $3) RETURNING *',
    values: [trainer_id, pokemon_id, Date.now()],
  };

  const client = new Client(connectionString);
  await client.connect();

  await client
    .query(query)
    .then((results) => {
      _res.status(201).send({
        time: Date.now(),
        data: results.rows[0],
      });
    })
    .catch((error) => {
      console.log(error);
      _res.status(418).send({
        msg: error.msg,
      });
    })
    .finally(() => client.end());
};

export default addPokemon;
