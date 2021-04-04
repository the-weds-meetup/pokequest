import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InputNumber from 'rc-input-number';

import { IQuest } from '../../../interfaces';

interface IInventoryCount {
  count: number;
  inventory: number[];
}

interface Props {
  quest: IQuest;
  pokemonCount: Record<string, IInventoryCount>;
  trainerID: string;
  onAfterSubmit?: () => void;
}

const BodyWapper = styled.div`
  .pokemon {
    padding-top: 24px;
    padding-bottom: 24px;

    h3 {
      margin: 0;
      padding-bottom: 16px;
    }
  }
`;

const PickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;

  .picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 16px;

    p {
      margin: 0;
      padding-top: 16px;
      font-weight: 500;
    }
  }

  img {
    width: 120px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 32px;

  button {
    margin: 0 auto;
    padding: 16px 32px;
    min-width: 300px;

    background-color: #037bff;
    border-radius: 4px;
    border: #00000027 1px solid;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
  }

  button :disabled {
    background-color: #00000056;
    color: black;
  }
`;

const ModalSend: React.FC<Props> = (props) => {
  const {
    quest: { id: quest_id, pokemon: pokemonList },
    pokemonCount,
    trainerID,
    onAfterSubmit,
  } = props;

  const [poke1, setPoke1] = useState(0);
  const [poke2, setPoke2] = useState(0);
  const [poke3, setPoke3] = useState(0);
  const pokeList = [poke1, poke2, poke3];
  const setPokeList = [setPoke1, setPoke2, setPoke3];

  const canSubmit = useMemo(() => {
    return poke1 > 0 || poke2 > 0 || poke3 > 0;
  }, [poke1, poke2, poke3]);

  const onSubmit = async () => {
    const data: Record<number, number> = {};
    pokemonList.map((pokemon, index) => {
      const pokeId = pokemon.id;
      if (pokeList[index] > 0) {
        data[pokeId] = pokeList[index];
      }
    });

    await axios
      .post(`/api/mission/send/${quest_id}`, {
        trainer_id: trainerID,
        pokemon_list: data,
      })
      .then(() => onAfterSubmit());
  };

  const Picker = () =>
    pokemonList.map((pokemon, index) => {
      const max = pokemonCount[`${pokemon.id}`].count;
      const isDisabled = max === 0;

      return (
        <div className="picker" key={index}>
          <img src={pokemon.sprite} />
          <InputNumber
            pattern="\d*"
            step={1}
            defaultValue={0}
            value={pokeList[index]}
            min={0}
            max={max}
            disabled={isDisabled}
            onChange={(value: number) => setPokeList[index](value)}
          />
          <p>
            You have {max} {pokemon.name}
          </p>
        </div>
      );
    });

  return (
    <BodyWapper>
      <div className="pokemon">
        <h3>Send Pokemon to Professor Oak</h3>
        <PickerWrapper>{Picker()}</PickerWrapper>
        <ButtonWrapper>
          <button disabled={!canSubmit} onClick={() => onSubmit()}>
            Send Pokemon
          </button>
        </ButtonWrapper>
      </div>
    </BodyWapper>
  );
};

export default ModalSend;
