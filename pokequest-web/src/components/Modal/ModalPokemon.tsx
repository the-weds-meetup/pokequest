import React, { useState } from 'react';
import styled from 'styled-components';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

import { ModalTemplate } from './components';

import { IPokemon } from '../../interfaces';

interface Props {
  pokemon: IPokemon[];
  handleClose: () => void;
}

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: #00000027 1px solid;

  p {
    margin: 0;
    font-weight: 500;
    color: #00000078;
  }

  .padding {
    padding-bottom: 16px;
  }
`;

const BodyWrapper = styled.div`
  padding: 24px 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  img {
    width: 120px;
    height: 120px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  button {
    height: inherit;
    border: 0;
    display: flex;
    background-color: #fff;
    cursor: pointer;
  }

  h1 {
    margin: 0;
    padding-bottom: 8px;
  }
`;

const Modal: React.FC<Props> = (props) => {
  const { pokemon, handleClose } = props;

  return (
    <ModalTemplate>
      {/* Title */}
      <ModalTitle handleClose={handleClose} />
      <ModalBody pokemon={pokemon} />
    </ModalTemplate>
  );
};

const ModalTitle: React.FC<{ handleClose: () => void }> = (props) => {
  const { handleClose } = props;
  return (
    <TitleWrapper>
      <Title>
        <h1>You caught:</h1>
        <button onClick={handleClose}>
          <Icon path={mdiClose} size={1.4} horizontal color="#00000087" />
        </button>
      </Title>
    </TitleWrapper>
  );
};

const ModalBody: React.FC<{ pokemon: IPokemon[] }> = (props) => {
  const { pokemon: pokemonList } = props;

  return (
    <BodyWrapper>
      {pokemonList.map((pokemon, index) => (
        <img src={pokemon.sprite} key={index} />
      ))}
    </BodyWrapper>
  );
};

export default Modal;
