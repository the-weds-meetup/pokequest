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

const getMissionTrainers = async (
  _req: Request,
  _res: Response
): Promise<void> => {
  const { mission } = _req.params;
  const { is_admin } = _req.body;

  const query = {
    text: 'SELECT * FROM trainer_mission WHERE mission_id = $1',
    values: [mission],
  };

  if (!is_admin) {
    _res.status(403).send('Forbidden');
  }

  const client = new Client(connectionString);
  await client.connect();

  await client
    .query(query)
    .then((results) => {
      _res.status(201).send({
        time: Date.now(),
        data: results.rows,
      });
    })
    .catch((error) => {
      console.log(error);
      _res.status(418).send('Server Error');
    })
    .finally(() => client.end());
};

export default getMissionTrainers;
