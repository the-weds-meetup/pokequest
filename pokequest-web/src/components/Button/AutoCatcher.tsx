import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { IPokemon } from '../../interfaces';

interface Props {
  handleClick: (id: string) => void;
}

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: #00000027 1px solid;
  background-color: #ffffff99;

  p {
    margin: 0;
  }

  button {
    height: 100%;
    padding: 0 16px;
    background-color: #037bff;
    border-radius: 4px;
    border: #00000027 1px solid;
    color: white;
    cursor: pointer;
  }
`;

const Button: React.FC<Props> = (props) => {
  const { handleClick } = props;
  const [googleId, setGoogleId] = useState('');
  const [pokemonCaught, setPokemonCaught] = useState<IPokemon[] | []>([]);

  useEffect(() => {
    setGoogleId(sessionStorage.getItem('googleId'));
  }, []);

  const catchPokemon = async () => {
    await axios
      .post('/api/pokemon/add', { trainer_id: googleId })
      .then((response) => {
        setPokemonCaught(response.data.pokemon);
        handleClick(googleId);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <p>Busy? Try the auto-catcher today!</p>
      <button onClick={() => catchPokemon()}> Catch 6 Pokemon </button>
    </Wrapper>
  );
};

export default Button;