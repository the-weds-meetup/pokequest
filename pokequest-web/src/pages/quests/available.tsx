import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useAppContext } from '../../context/state';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import SEO from '../../components/SEO';
import SideNav from '../../components/SideNav';
import MissionNav from '../../components/MissionNav';
import { AddButton } from '../../components/Button';
import QuestSection from '../../components/Quest/QuestSection';
import QuestEmpty from '../../components/Quest/QuestEmpty';
import Modal from '../../components/Modal/ModalAvailable';
import ModalAddQuest from '../../components/Modal/ModalAdd';

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
  const { adminMode, googleId } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [availableQuest, setAvailableQuest] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState<IQuest | undefined>(
    undefined
  );

  useEffect(() => {
    getAvailableQuest();
  }, []);

  const getAvailableQuest = async () => {
    return await axios
      .get(`/api/mission/available/${googleId}`)
      .then((response) => setAvailableQuest(response.data.available))
      .catch((error) => console.log(error));
  };

  const getQuestInfo = (quest: IQuest) => {
    setSelectedQuest(quest);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedQuest(undefined);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    getAvailableQuest();
    setShowAddModal(false);
  };

  const hasAvailable = useMemo(() => {
    return availableQuest.length > 0;
  }, [availableQuest]);

  return (
    <>
      <SEO title={'Available Quests'} />
      <SideNav />
      <DefaultLayout>
        <Content>
          <MissionNav />
          <div style={{ height: '48px' }} />

          {adminMode && <AddButton onOpen={openAddModal} />}

          {hasAvailable ? (
            <QuestSection
              title="Available"
              quests={availableQuest}
              setCurrentQuest={getQuestInfo}
            />
          ) : (
            <QuestEmpty>
              <p>
                No quests yet! Follow our{' '}
                <a href={process.env.TWITTER_URL} target="_blank">
                  Twitter
                </a>{' '}
                so you will be updated when a new quest has arrived!
              </p>
            </QuestEmpty>
          )}

          {showModal && (
            <Modal quest={selectedQuest} handleClose={closeModal} />
          )}

          {showAddModal && <ModalAddQuest handleClose={closeAddModal} />}
        </Content>
      </DefaultLayout>
    </>
  );
};

export default Quests;
