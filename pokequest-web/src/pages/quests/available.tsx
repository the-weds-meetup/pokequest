import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import axios from 'axios';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import SEO from '../../components/SEO';
import SideNav from '../../components/SideNav';
import MissionNav from '../../components/MissionNav';
import AddButton from '../../components/AddMissionBtn';
import QuestSection from '../../components/Quest/QuestSection';
import Modal from '../../components/Modal/ModalOngoing';

import { IQuest } from '../../interfaces';

const Content = styled.main`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Quests: React.FC = () => {
  const router = useRouter();
  const [adminMode, setAdminMode] = useState(false);
  const [googleName, setGoogleName] = useState('');
  const [googleId, setGoogleId] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [selectedQuest, setSelectedQuest] = useState<IQuest | undefined>(
    undefined
  );

  const [availableQuest, setAvailableQuest] = useState([]);

  useEffect(() => {
    const id = sessionStorage.getItem('googleId');
    setAdminMode(sessionStorage.getItem('admin') === 'true');
    setGoogleName(sessionStorage.getItem('googleName'));
    setGoogleId(id);

    const getAvailableQuest = async () => {
      return await axios
        .get(
          `${process.env.NEXT_PUBLIC_MISSION_MANAGEMENT}/mission/available/${id}`
        )
        .then((response) => {
          const data = response.data.data;
          setAvailableQuest(data);
        })
        .catch((error) => console.log(error));
    };
    getAvailableQuest();
  }, [googleId]);

  const getQuestInfo = (quest: IQuest) => {
    setSelectedQuest(quest);
    setShowModal(true);

    console.log(quest);
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
            <Modal
              type="available"
              quest={selectedQuest}
              handleClose={closeModal}
            />
          )}
        </Content>
      </DefaultLayout>
    </>
  );
};

export default Quests;
