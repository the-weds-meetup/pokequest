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

const getMissionsCompleted = async (
  _req: Request,
  _res: Response
): Promise<void> => {
  // get all missions where end time is more than the unix time now
  const query = {
    text: 'SELECT * FROM mission WHERE end_time >= $1 ',
    values: [Date.now()],
  };

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
      _res.status(418).send({
        data: error.message,
      });
    })
    .finally(() => client.end());
};

export default getMissionsCompleted;
