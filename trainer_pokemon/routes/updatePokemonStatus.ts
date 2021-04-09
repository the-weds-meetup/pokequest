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
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: port,
    };

const updatePokemonStatus = async (
  _req: Request,
  _res: Response
): Promise<void> => {
  const { inventory_id } = _req.params;
  const { update_type } = _req.body;
  let isConnect = false;

  const query = {
    text: 'UPDATE trainer_pokemon SET status = $1 WHERE id = $2',
    values: [update_type, inventory_id],
  };
  const client = new Client(connectionString);

  try {
    if (!update_type) {
      throw { message: 'Missing Types' };
    }

    if (update_type !== 'mission' && update_type !== 'released') {
      throw { message: 'Incorrect Types' };
    }

    await client.connect().then(() => {
      isConnect = true;
    });

    await client.query(query).then(() => {
      _res.status(201).send({
        time: Date.now(),
        data: 'Updated',
      });
    });
  } catch (error) {
    console.log('[TRAINER_POKEMON]:', error);
    _res.status(418).send({
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

export default updatePokemonStatus;
