import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Client } from 'pg';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const port = parseInt(`${process.env.DATABASE_PORT}`) || 5432;
const server_name = 'trainer_pokemon';

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

const getAllPokemon = async (_req: Request, _res: Response): Promise<void> => {
  const { trainer } = _req.params;
  let isConnect = false;

  const query = {
    text: 'SELECT * FROM trainer_pokemon WHERE trainer_id = $1',
    values: [trainer],
  };
  const client = new Client(connectionString);

  try {
    await client.connect().then(() => {
      isConnect = true;
    });
    await client.query(query).then((results) => {
      _res.status(201).send({
        time: Date.now(),
        data: results.rows,
      });
    });
  } catch (error) {
    console.log('[TRAINER_POKEMON]:', error);
    _res.status(418).send({
      time: Date.now(),
      server: server_name,
      msg: error.message,
    });
  } finally {
    // disconnect client if connected
    if (isConnect) {
      client.end();
    }
  }
};

export default getAllPokemon;
