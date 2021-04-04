// Database Tables
interface IMission {
  id: number;
  star_time: number;
  end_time: number;
  is_complete: boolean;
  creation_time: boolean;
}

interface IMissionPokemon {
  id: number;
  mission_id: number;
  pokemon_id: number;
}

interface ITrainerMission {
  id: number;
  mission_id: number;
  trainer_id: string;
  trainer_name: string;
  creation_time: number;
}

interface ITrainerPokemon {
  id: number;
  trainer_id: string;
  pokemon_id: number;
  catch_time: number;
  status: 'caught' | 'mission' | 'released';
}

interface IMissionTrainerPokemon {
  id: number;
  mission_id: number;
  trainer_pokemon_id: number;
}

export {
  IMission,
  IMissionPokemon,
  ITrainerMission,
  ITrainerPokemon,
  IMissionTrainerPokemon,
};
