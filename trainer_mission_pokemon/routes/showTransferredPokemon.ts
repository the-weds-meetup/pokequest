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
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: port,
    };

const showTransferredPokemon = async (
  _req: Request,
  _res: Response
): Promise<void> => {
  const { mission_id } = _req.params;
  const isConnect = false;

  const query = {
    text: 'SELECT * FROM mission_trainer_pokemon WHERE mission_id = $1',
    values: [mission_id],
  };
  const client = new Client(connectionString);

  try {
    await client.connect();
    await client.query(query).then((results) => {
      _res.status(201).send({
        time: Date.now(),
        data: results.rows,
      });
    });
  } catch (error) {
    console.log('[TRAINER_POKEMON_MISSION]:', error);
    _res.status(418).send({
      time: Date.now(),
      server: 'trainer_pokemon_mission',
      msg: error.message,
    });
  } finally {
    // disconnect client if connected
    if (isConnect) {
      client.end();
    }
  }
};

export default showTransferredPokemon;
