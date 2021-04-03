import React, { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { IQuest, IPokemonCount } from '../../../interfaces';

interface Props {
  quest: IQuest;
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

const ModalBody: React.FC<Props> = (props) => {
  const {
    quest: { id, pokemon: pokemonList },
  } = props;

  const [globalStats, setGlobalStats] = useState<IPokemonCount[]>([]);

  const isLoading = useMemo(() => {
    return globalStats.length === 0;
  }, [globalStats]);

  return (
    <BodyWapper>
      <div className="pokemon">
        <h3>Send Pokemon to Professor Oak</h3>
        <div className="pokemon-img">
          {pokemonList.map((pokemon) => (
            <PokemonImage key={pokemon.id}>
              <img src={pokemon.sprite} />
            </PokemonImage>
          ))}
        </div>
      </div>
    </BodyWapper>
  );
};

export default ModalBody;
