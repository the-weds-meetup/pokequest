import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import SEO from '../../components/SEO';
import SideNav from '../../components/SideNav';
import { AutoCatcher } from '../../components/Button';
import Modal from '../../components/Modal/ModalAccepted';

import { IPokemon } from '../../interfaces';
import { fromPairs } from 'lodash';

interface InventoryProps extends IPokemon {
  inventory_id: number;
}

const Content = styled.main`
  width: 100%;
  height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PokeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 30px;
  grid-auto-flow: dense;
  padding: 32px;

  .grid {
    display: flex;
    justify-content: center;
  }

  img {
    width: 80px;
  }
`;

const Quests: React.FC = () => {
  const router = useRouter();
  const [googleId, setGoogleId] = useState('');
  const [trainerPokemon, setTrainerPokemon] = useState<InventoryProps[] | []>(
    []
  );

  useEffect(() => {
    const id = sessionStorage.getItem('googleId');
    setGoogleId(id);
    getTrainerPokemon(id);
  }, []);

  const getTrainerPokemon = async (id: string) => {
    return await axios
      .post(`/api/pokemon/inventory/all`, {
        trainer_id: id,
      })
      .then((response) => {
        const data = response.data;
        setTrainerPokemon(data.available.pokemon);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <SEO title={'Your Pokemon'} />
      <SideNav />
      <DefaultLayout>
        <div className="bgImage">
          <Image
            src="/images/background.png"
            alt="background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>

        <Content>
          <AutoCatcher handleClick={getTrainerPokemon} />

          {trainerPokemon.length > 0 ? (
            <PokeGrid>
              {trainerPokemon.map((pokemon) => (
                <div key={pokemon.inventory_id} className="grid">
                  <img src={pokemon.official_artwork} />
                </div>
              ))}
            </PokeGrid>
          ) : (
            <>loading</>
          )}
        </Content>
      </DefaultLayout>
    </>
  );
};

export default Quests;
