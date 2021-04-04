import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req, res) => {
  if (req.method === 'POST') {
    const { trainer_id, filter_pokemon } = req.body;

    try {
      const pokemon = await getPokemon(trainer_id, filter_pokemon);

      res.status(201).send({
        available: pokemon,
      });
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  }
};

const getPokemon = async (trainer_id: string, filter_pokemon: number[]) => {
  return await axios
    .get(process.env.POKEMON_MANAGEMENT + `/pokemon/inventory/count`, {
      data: {
        trainer_id,
        filter_pokemon,
      },
    })
    .then((response) => response.data.data)
    .catch((error) => {
      console.log(error, "Unable to get trainer's pokemon");
      return [];
    });
};
