import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useAppContext } from '../../context/state';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import SEO from '../../components/SEO';
import SideNav from '../../components/SideNav';
import MissionNav from '../../components/MissionNav';
import AddButton from '../../components/AddMissionBtn';
import QuestSection from '../../components/Quest/QuestSection';
import Modal from '../../components/Modal/ModalAvailable';

import { IQuest } from '../../interfaces';

const Content = styled.main`
  padding: 16px 36px;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media only screen and (max-device-width: 812px) {
    padding: 16px;
  }
`;

const Quests: React.FC = () => {
  const router = useRouter();
  const { adminMode, googleId } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [availableQuest, setAvailableQuest] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState<IQuest | undefined>(
    undefined
  );

  useEffect(() => {
    const getAvailableQuest = async () => {
      return await axios
        .get(`/api/mission/available/${googleId}`)
        .then((response) => setAvailableQuest(response.data.available))
        .catch((error) => console.log(error));
    };
    getAvailableQuest();
  }, []);

  const getQuestInfo = (quest: IQuest) => {
    setSelectedQuest(quest);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedQuest(undefined);
  };

  return (
    <>
      <SEO title={'Available Quests'} />
      <SideNav />
      <DefaultLayout>
        <Content>
          <MissionNav />
          <div style={{ height: '48px' }} />

          {adminMode && <AddButton />}

          {availableQuest.length > 0 && (
            <QuestSection
              title="Available"
              quests={availableQuest}
              setCurrentQuest={getQuestInfo}
            />
          )}

          {showModal && (
            <Modal quest={selectedQuest} handleClose={closeModal} />
          )}
        </Content>
      </DefaultLayout>
    </>
  );
};

export default Quests;
