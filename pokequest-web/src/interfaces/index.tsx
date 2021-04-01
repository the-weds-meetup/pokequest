export interface QuestProps {
  id: number;
  start_time: string;
  end_time: string;
  creation_time: string;
  is_complete: boolean;
  pokemon: PokemonProps[];
}

export interface PokemonProps {
  id: number;
  name: string;
  sprite: string;
  official_artwork: string;
}
