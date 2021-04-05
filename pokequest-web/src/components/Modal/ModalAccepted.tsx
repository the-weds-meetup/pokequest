import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useAppContext } from '../../context/state';
import { ModalTitle, ModalTemplate, ModalBody, ModalSend } from './components';

import { IQuest } from '../../interfaces';

interface Props {
  type: 'now' | 'future' | 'past';
  quest: IQuest;
  handleClose: () => void;
}

interface IInventoryCount {
  count: number;
  inventory: number[];
}

const Modal: React.FC<Props> = (props) => {
  const { type, quest, handleClose } = props;
  const { googleId } = useAppContext();
  const [error, setError] = useState(false);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [pokemonCount, setPokemonCount] = useState<
    Record<string, IInventoryCount>
  >({});
  const tabNames = ['Global Stats', 'Send Pokemon'];
  const router = useRouter();

  useEffect(() => {
    fetchInventoryCount();
  }, []);

  const pokemon_list = useMemo(() => {
    const pokemon = quest.pokemon;
    return pokemon.map((poke) => poke.id);
  }, [quest]);

  const changeTab = (tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  const fetchInventoryCount = async () => {
    await axios
      .post(`/api/pokemon/inventory/count`, {
        trainer_id: googleId,
        filter_pokemon: pokemon_list,
      })
      .then((response) => {
        const data = response.data;
        setPokemonCount(data.available.pokemon);
      })
      .catch((error) => console.log(error));
  };

  const afterSubmit = async () => {
    await fetchInventoryCount();
    changeTab(0);
  };

  return (
    <ModalTemplate>
      <ModalTitle
        quest={quest}
        handleClose={handleClose}
        tabNames={tabNames}
        currentIndex={currentTabIndex}
        handleTabChange={changeTab}
      />

      {currentTabIndex === 0 ? (
        <ModalBody quest={quest} />
      ) : (
        <ModalSend
          quest={quest}
          pokemonCount={pokemonCount}
          trainerID={googleId}
          onAfterSubmit={afterSubmit}
        />
      )}
    </ModalTemplate>
  );
};

export default Modal;
