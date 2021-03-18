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

const returnAllMissions = async (
  _req: Request,
  _res: Response
): Promise<void> => {
  const { mission_id } = _req.params;
  const query = {
    text: 'SELECT * FROM mission WHERE id = $1',
    values: [mission_id],
  };

  const client = new Client(connectionString);
  await client.connect();

  await client
    .query(query)
    .then((results) => {
      console.log(results);
      _res.status(201).send({
        time: Date.now(),
        data: results.rows[0],
      });
    })
    .catch((error) => {
      console.log(error);
      _res.status(418).send({
        data: error.message,
      });
    })
    .finally(() => client.end());
};

export default returnAllMissions;
