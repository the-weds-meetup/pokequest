import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Client } from 'pg';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const port = parseInt(`${process.env.DATABASE_PORT}`) || 5432;
const server_name = 'mission';

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

const addMission = async (_req: Request, _res: Response): Promise<void> => {
  const { start_time, end_time } = _req.body;
  const isConnect = false;

  const query = {
    text:
      'INSERT INTO mission(start_time, end_time, creation_time) VALUES($1, $2, $3) RETURNING *',
    values: [start_time, end_time, Date.now()],
  };
  const client = new Client(connectionString);

  try {
    if (!start_time || !end_time) {
      throw { message: 'Missing Variables' };
    }

    await client.connect();
    await client.query(query).then((results) => {
      const mission = results.rows[0];
      _res.status(201).send({
        time: Date.now(),
        data: mission,
      });
    });
  } catch (error) {
    console.log('[MISSION]:', error);
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

export default addMission;
