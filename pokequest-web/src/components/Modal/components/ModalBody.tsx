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

const ModalBody: React.FC<Props> = (props) => {
  const {
    quest: { id, pokemon: pokemonList },
  } = props;

  const [globalStats, setGlobalStats] = useState<IPokemonCount[]>([]);

  useEffect(() => {
    const getGlobalStats = async () => {
      const data = await axios
        .get('/api/mission/info/count/' + id)
        .then((response) => response.data);
      setGlobalStats(data);
    };
    getGlobalStats();
  }, []);

  const isLoading = useMemo(() => {
    return globalStats.length === 0;
  }, [globalStats]);

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
              : globalStats.map((pokemon) => (
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

export default ModalBody;
