import React, { ChangeEvent, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useAppContext } from '../../context/state';
import PokemonGrid from '../PokemonList';
import { ModalTemplate } from './components';
import { ButtonWrapper } from '../../components/Button/styled';
import {
  Title,
  TitleWrapper,
  BodyWrapper as Wrapper,
} from './components/styled';
import { IPokemon } from '../../interfaces';

interface Props {
  handleClose: () => void;
}

const ModalBody = styled(Wrapper)`
  .break {
    height: 32px;
  }

  .break2 {
    height: 64px;
  }

  .errorWrapper {
    color: red;
    text-align: center;
    margin-top: 16px;

    p {
      margin: 0;
      padding: 8px 0;
    }
  }
`;

const DateWrapper = styled.div`
  padding-bottom: 16px;
  p {
    margin: 0;
    padding-bottom: 8px;
    padding-right: 16px;
    font-size: 0.9rem;
    font-weight: bold;
  }
`;

const Modal: React.FC<Props> = (props) => {
  const { handleClose } = props;
  const { adminMode } = useAppContext();
  const [pokemonSelect, setPokemonSelect] = useState<string[]>([]);
  const [allPokemon, setAllPokemon] = useState<IPokemon[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dateError = useMemo(() => {
    return endDate <= startDate;
  }, [endDate, startDate]);
  const pokeSelectError = useMemo(() => {
    return pokemonSelect.length === 0 || pokemonSelect.length > 3;
  }, [pokemonSelect]);
  const submitDisabled = useMemo(() => {
    return dateError || pokeSelectError;
  }, [dateError, pokeSelectError]);

  console.log(pokeSelectError, dateError, submitDisabled);
  useEffect(() => {
    if (!adminMode) {
      handleClose();
    }
    const getAllPokemon = async () => {
      await axios.get('/api/pokemon/all').then((response) => {
        setAllPokemon(response.data.pokemon);
      });
    };

    getAllPokemon();
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    setStartDate(todayDate);
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    setEndDate(tomorrowDate);
  }, []);

  // handle when pokemon is clicked
  const onPokemonSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const isCheck = e.target.checked;
    const newPokemon = e.target.value;
    if (isCheck) {
      setPokemonSelect([...pokemonSelect, newPokemon]);
    } else {
      setPokemonSelect(pokemonSelect.filter((pokeId) => pokeId !== newPokemon));
    }
  };

  const onStartDateChange = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    setStartDate(date);
  };

  const onEndDateChange = (date: Date) => {
    date.setHours(23, 59, 59, 999);
    setEndDate(date);
  };

  const onSubmit = async () => {
    onStartDateChange(startDate);
    onEndDateChange(endDate);

    // check if meet the criteria
    //   1. end date > start date
    if (dateError || pokeSelectError) {
      console.log('errors found when creating mission');
      return;
    }

    const payload = {
      poke_array: pokemonSelect,
      start_time: startDate,
      end_time: endDate,
    };

    // send response here
    await axios
      .post('/api/mission/add', payload)
      .then(() => handleClose())
      .catch((response) => {
        console.log(response.data);
      });
  };

  return (
    <ModalTemplate>
      <ModalTitle handleClose={handleClose} />
      <ModalBody>
        <h2>Select Date</h2>
        <DateWrapper>
          <p>Quest Start Date</p>
          <DatePicker
            selected={startDate}
            onChange={onStartDateChange}
            showPopperArrow={false}
          />
        </DateWrapper>
        <DateWrapper>
          <p>Quest End Date</p>
          <DatePicker
            selected={endDate}
            onChange={onEndDateChange}
            showPopperArrow={false}
          />
        </DateWrapper>

        <div className="break" />

        <h2>Select Pokemon</h2>
        <p>Select up to 3 Pokemon</p>
        <PokemonGrid data={allPokemon} onChange={onPokemonSelect} />

        <div className="break" />

        <ButtonWrapper>
          <button onClick={onSubmit} disabled={submitDisabled}>
            Create a Quest
          </button>
        </ButtonWrapper>

        <div className="errorWrapper">
          {dateError && <p>Invalid Dates</p>}
          {pokeSelectError && <p>Select up to 3 Pokemon</p>}
        </div>
      </ModalBody>
    </ModalTemplate>
  );
};

export default Modal;

const ModalTitle: React.FC<{ handleClose: () => void }> = (props) => {
  const { handleClose } = props;
  return (
    <TitleWrapper>
      <Title>
        <h1>Create a Quest</h1>
        <button onClick={handleClose}>
          <Icon path={mdiClose} size={1.4} horizontal color="#00000087" />
        </button>
      </Title>
      <div className="padding" />
    </TitleWrapper>
  );
};
