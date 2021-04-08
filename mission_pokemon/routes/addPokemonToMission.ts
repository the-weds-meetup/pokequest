import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Client } from 'pg';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const port = parseInt(`${process.env.DATABASE_PORT}`) || 5432;
const server_name = 'mission_pokemon';

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

const addPokemonToMission = async (
  _req: Request,
  _res: Response
): Promise<void> => {
  const { poke_id, mission_id } = _req.body;
  const client = new Client(connectionString);
  const query = {
    text:
      'INSERT INTO mission_pokemon(mission_id, pokemon_id) VALUES($1, $2) RETURNING *',
    values: [mission_id, poke_id],
  };
  let isConnect = false;

  try {
    if (!poke_id || !mission_id) {
      throw { message: 'Missing Variables' };
    }

    await client.connect().then(() => {
      isConnect = true;
    });
    await client.query(query).then((results) => {
      _res.status(201).send({
        time: Date.now(),
        data: results.rows[0],
      });
    });
  } catch (error) {
    console.log('[MISSION_POKEMON]:', error.message);
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

export default addPokemonToMission;
