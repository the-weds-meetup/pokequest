import React from 'react';
import styled from 'styled-components';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

import { ModalTemplate } from './components';
import {
  Title,
  TitleWrapper,
  BodyWrapper as Wrapper,
} from './components/styled';

import { IPokemon } from '../../interfaces';

interface Props {
  pokemon: IPokemon[];
  handleClose: () => void;
}

const BodyWrapper = styled(Wrapper)`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  img {
    width: 120px;
    height: 120px;
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
      <div className="padding" />
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
