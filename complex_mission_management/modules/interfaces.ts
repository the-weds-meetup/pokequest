// Database Tables
interface Mission {
  id: number;
  star_time: number;
  end_time: number;
  is_complete: boolean;
  creation_time: boolean;
}

interface Mission_Pokemon {
  id: number;
  mission_id: number;
  pokemon_id: number;
}

interface Trainer_Mission {
  id: number;
  mission_id: number;
  trainer_id: string;
  trainer_name: string;
  creation_time: number;
}

interface Trainer_Pokemon {
  id: number;
  trainer_id: string;
  pokemon_id: number;
  catch_time: number;
  status: 'caught' | 'mission' | 'released';
}

interface Mission_Trainer_Pokemon {
  id: number;
  mission_id: number;
  trainer_pokemon_id: number;
}

export {
  Mission,
  Mission_Pokemon,
  Trainer_Mission,
  Trainer_Pokemon,
  Mission_Trainer_Pokemon,
};
