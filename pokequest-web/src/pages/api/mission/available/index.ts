import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(404).send('No resources');
};

export default handler;
