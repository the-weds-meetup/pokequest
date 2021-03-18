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
      host: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: port,
    };

const addMission = async (_req: Request, _res: Response): Promise<void> => {
  const {
    data: { start_time, end_time },
  } = _req.body;

  if (!start_time || !end_time) {
    _res.status(401).send({
      data: {
        server: server_name,
        msg: 'Missing Variables',
      },
    });
  }

  const query = {
    text:
      'INSERT INTO mission(start_time, end_time, creation_time) VALUES($1, $2, $3) RETURNING *',
    values: [start_time, end_time, Date.now()],
  };

  const client = new Client(connectionString);
  await client.connect();

  await client
    .query(query)
    .then((results) => {
      const mission = results.rows[0];
      console.log(mission);
      _res.status(201).send({
        time: Date.now(),
        data: mission,
      });
    })
    .catch((error: Error) => {
      console.log('[Mission Server]', error);
      _res.status(418).send({
        data: {
          server: server_name,
          error: error.message,
        },
      });
    })
    .finally(() => client.end());
};

export default addMission;
