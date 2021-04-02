export interface IQuest {
  id: number;
  start_time: string;
  end_time: string;
  creation_time: string;
  is_complete: boolean;
  pokemon: IPokemon[];
}

export interface IPokemon {
  id: number;
  name: string;
  sprite: string;
  official_artwork: string;
}

export interface IPokemonCount {
  pokemon?: IPokemon;
  count?: number;
}
