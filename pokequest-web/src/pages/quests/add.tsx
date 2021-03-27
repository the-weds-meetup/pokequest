import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import SEO from '../../components/SEO';
import SideNav from '../../components/SideNav';
import Header from '../../components/SiteHeader';
import PokemonGrid from '../../components/PokemonList';
import 'react-datepicker/dist/react-datepicker.css';

const Content = styled.main`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;

  h2 {
    margin: 0;
    padding-bottom: 12px;
  }

  p {
    margin: 0;
    padding-bottom: 16px;
  }

  .break {
    height: 32px;
  }

  .break2 {
    height: 64px;
  }

  .errorMsg {
    color: red;
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

const SubmitBtn = styled.button`
  width: 200px;
  height: 56px;
  margin: 0 auto;
`;

interface Props {
  types: string;
  data: {
    id: number;
    name: string;
    sprite: string;
    official_artwork: string;
  }[];
}

const AddQuest: React.FC<Props> = (props) => {
  const { types, data } = props;
  const router = useRouter();
  const [adminMode, setAdminMode] = useState(false);
  const [pokemonSelect, setPokemonSelect] = useState(['']);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('admin') === 'true';
    setAdminMode(isAdmin);
    if (!isAdmin) {
      router.back();
    }

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    setStartDate(todayDate);

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    setEndDate(tomorrowDate);

    setPokemonSelect([]);
  }, []);

  // handle when pokemon is clicked
  const _onPokemonSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const isCheck = e.target.checked;
    const newPokemon = e.target.value;
    if (isCheck) {
      setPokemonSelect([...pokemonSelect, newPokemon]);
    } else {
      setPokemonSelect(pokemonSelect.filter((pokeId) => pokeId !== newPokemon));
    }
  };

  const _onStartDateChange = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    setStartDate(date);
  };

  const _onEndDateChange = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    setEndDate(date);
  };

  const _onSubmit = async () => {
    const dateError = endDate <= startDate;

    // check if meet the criteria
    // end date > start date
    if (dateError) {
      // error
    }

    if (dateError || pokemonSelect.length > 3) {
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
      .then(() => router.push('/quests'))
      .catch((response) => {
        console.log(response.data);
      });
  };

  return (
    <>
      <SEO title={'New Quest'} />
      <SideNav />
      <DefaultLayout>
        <Content>
          <Header title="Create a Quest" />

          <h2>Select Date</h2>

          <DateWrapper>
            <p>Quest Start Date</p>
            <DatePicker
              selected={startDate}
              onChange={_onStartDateChange}
              showPopperArrow={false}
            />
          </DateWrapper>

          <DateWrapper>
            <p>Quest End Date&nbsp;&nbsp;</p>
            <DatePicker
              selected={endDate}
              onChange={_onEndDateChange}
              showPopperArrow={false}
            />
          </DateWrapper>

          <div className="break" />

          <h2>Select Pokemon</h2>
          {pokemonSelect.length <= 3 ? (
            <p>Select up to 3 Pokemon</p>
          ) : (
            <p className="errorMsg">Select up to 3 Pokemon</p>
          )}
          <PokemonGrid data={data} onChange={_onPokemonSelect} />

          <div className="break2" />

          <SubmitBtn onClick={_onSubmit}>Create</SubmitBtn>
        </Content>
      </DefaultLayout>
    </>
  );
};

// Call these on server side
export async function getStaticProps() {
  try {
    const pokemon_list = await axios
      .get(process.env.MISSION_MANAGEMENT_ADMIN + '/pokemon')
      .then((res) => res.data.pokemon);

    return {
      props: {
        success: true,
        data: pokemon_list,
      },
    };
  } catch (error) {
    return {
      props: {
        success: false,
        data: error,
      },
    };
  }
}

export default AddQuest;
