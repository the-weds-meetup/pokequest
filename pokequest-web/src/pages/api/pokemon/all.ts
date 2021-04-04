import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const pokemon_list = await axios
        .get(process.env.MISSION_MANAGEMENT_ADMIN + '/pokemon')
        .then((res) => res.data.pokemon);

      res.status(201).send({
        pokemon: pokemon_list,
      });
      console.log('here is every pokemon');
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  }
};
