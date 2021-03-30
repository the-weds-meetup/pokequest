import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const PokeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  grid-auto-flow: dense;
`;

const PokemonItem = styled.label`
  [type='checkbox'] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  [type='checkbox'] + img {
    cursor: pointer;
    width: 100px;
    height: 100px;
    border-radius: 12px;
  }

  [type='checkbox']:checked + img {
    box-shadow: 0 0 0 5px rgb(0, 123, 255);
    border-width: 2px;
  }
`;

interface Props {
  data: {
    id: number;
    name: string;
    sprite: string;
    official_artwork: string;
  }[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PokemonList: React.FC<Props> = (props) => {
  const { data, onChange } = props;

  return (
    <PokeGrid>
      {data.map((pokemon) => (
        <PokemonItem key={pokemon.id}>
          <input
            type="checkbox"
            value={pokemon.id}
            name={pokemon.name}
            onChange={onChange}
          />
          <img src={pokemon.official_artwork} />
        </PokemonItem>
      ))}
    </PokeGrid>
  );
};

export default PokemonList;
