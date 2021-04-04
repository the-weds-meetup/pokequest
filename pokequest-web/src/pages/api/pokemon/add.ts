import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req, res) => {
  if (req.method === 'POST') {
    const { trainer_id } = req.body;

    try {
      const pokemon = await getPokemon(trainer_id);

      console.log('here you go');

      res.status(201).send({
        pokemon: pokemon,
      });
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  }
};

const getPokemon = async (trainer_id: string) => {
  return await axios
    .post(process.env.POKEMON_MANAGEMENT + `/pokemon/add`, {
      trainer_id,
    })
    .then((response) => response.data.data.pokemon)
    .catch((error) => {
      console.log(error, 'Unable to catch Pokemon');
      return [];
    });
};
