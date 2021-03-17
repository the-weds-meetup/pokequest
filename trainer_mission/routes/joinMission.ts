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

const joinMission = async (_req: Request, _res: Response): Promise<void> => {
  const { mission_id, trainer_id, trainer_name } = _req.body;

  if (!mission_id || !trainer_id) {
    _res.status(401).send('Missing variables');
  }

  const trainer = trainer_name || '';

  const query = {
    text:
      'INSERT INTO trainer_mission(mission_id, trainer_id, trainer_name, creation_time) VALUES($1, $2, $3, $4) RETURNING *',
    values: [mission_id, trainer_id, trainer, Date.now()],
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
      _res.status(418).send('Server Error');
    })
    .finally(() => client.end());
};

export default joinMission;
