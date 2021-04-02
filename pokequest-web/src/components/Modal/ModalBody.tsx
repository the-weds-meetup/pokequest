import React, { useMemo } from 'react';
import styled from 'styled-components';

import { IQuest, IPokemonCount } from '../../interfaces';

interface Props {
  quest: IQuest;
  pokemonCount: IPokemonCount[];
}

const BodyWapper = styled.div`
  .pokemon {
    padding-top: 24px;
    padding-bottom: 24px;

    h3 {
      margin: 0;
      padding-bottom: 16px;
    }

    .pokemon-img {
      display: flex;
      flex-direction: row;
    }
  }
`;

const PokemonImage = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 12px;

  img {
    overflow: hidden;
    width: 100px;
    height: 100px;
    margin: -50%;
  }
`;

const PokemonImageSmall = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  flex-direction: column;

  img {
    overflow: hidden;
    width: 90px;
    height: 90px;
    margin: -50%;
  }
`;

const PokeCounter = styled.div`
  .pokemon-img {
    display: flex;
    flex-direction: row;
  }

  .pokemon-count {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 24px;

    span {
      font-size: 1.2em;
      font-weight: 500;
      padding: 0 12px;
    }
  }
`;

export const ModalBody: React.FC<Props> = (props) => {
  const {
    quest: { pokemon: pokemonList },
    pokemonCount,
  } = props;

  const isLoading = useMemo(() => {
    return pokemonCount.length === 0;
  }, [pokemonCount]);

  return (
    <BodyWapper>
      <div className="pokemon">
        <h3>Catch as many of these Pokemon:</h3>
        <div className="pokemon-img">
          {pokemonList.map((pokemon) => (
            <PokemonImage key={pokemon.id}>
              <img src={pokemon.sprite} />
            </PokemonImage>
          ))}
        </div>

        <PokeCounter>
          <h4>Global Catch Statistics</h4>
          <div className="pokemon-img">
            {isLoading
              ? 'loading...'
              : pokemonCount.map((pokemon) => (
                  <div className="pokemon-count" key={pokemon.pokemon.id}>
                    <PokemonImageSmall>
                      <img src={pokemon.pokemon.sprite} />
                    </PokemonImageSmall>
                    <span>{pokemon.count}</span>
                  </div>
                ))}
          </div>
        </PokeCounter>
      </div>
    </BodyWapper>
  );
};
