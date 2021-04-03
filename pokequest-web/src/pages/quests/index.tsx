import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import axios from 'axios';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import SEO from '../../components/SEO';
import SideNav from '../../components/SideNav';
import MissionNav from '../../components/MissionNav';
import Modal from '../../components/Modal/ModalAccepted';
import QuestSection from '../../components/Quest/QuestSection';

import { IQuest } from '../../interfaces';

const Content = styled.main`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Quests: React.FC = () => {
  const router = useRouter();
  const [googleId, setGoogleId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [ongoingQuest, setOngoingQuest] = useState([]);
  const [futureQuest, setFutureQuest] = useState([]);
  const [completedQuest, setCompletedQuest] = useState([]);
  const [modalType, setModalType] = useState<'now' | 'future' | 'past'>('now');
  const [selectedQuest, setSelectedQuest] = useState<IQuest | undefined>(
    undefined
  );

  useEffect(() => {
    const id = sessionStorage.getItem('googleId');
    setGoogleId(id);

    const getSubscribedQuest = async () => {
      return await axios
        .get(`/api/mission/subscribed/${id}`)
        .then((response) => {
          const data = response.data;
          setOngoingQuest(data.ongoing);
          setFutureQuest(data.future);
          setCompletedQuest(data.completed);
        })
        .catch((error) => console.log(error));
    };

    getSubscribedQuest();
  }, []);

  const getPresentQuest = (quest: IQuest) => {
    setModalType('now');
    setSelectedQuest(quest);
    setShowModal(true);
  };

  const getFutureQuest = (quest: IQuest) => {
    setModalType('future');
    setSelectedQuest(quest);
    setShowModal(true);
  };

  const getPastQuest = (quest: IQuest) => {
    setModalType('past');
    setSelectedQuest(quest);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedQuest(undefined);
  };

  return (
    <>
      <SEO title={'Quests'} />
      <SideNav />
      <DefaultLayout>
        <Content>
          <MissionNav />
          <div style={{ height: '48px' }} />

          {ongoingQuest.length > 0 && (
            <QuestSection
              title="In Progress"
              quests={ongoingQuest}
              setCurrentQuest={getPresentQuest}
            />
          )}

          {futureQuest.length > 0 && (
            <QuestSection
              title="Upcoming Quests"
              quests={futureQuest}
              setCurrentQuest={getFutureQuest}
            />
          )}

          {completedQuest.length > 0 && (
            <QuestSection
              title="Past Quests"
              quests={completedQuest}
              setCurrentQuest={getPastQuest}
            />
          )}

          {showModal && (
            <Modal
              type={modalType}
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
