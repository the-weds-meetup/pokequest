import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useAppContext } from '../../context/state';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import SEO from '../../components/SEO';
import SideNav from '../../components/SideNav';
import MissionNav from '../../components/MissionNav';
import Modal from '../../components/Modal/ModalAccepted';
import QuestSection from '../../components/Quest/QuestSection';
import QuestEmpty from '../../components/Quest/QuestEmpty';

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
  const { googleId } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [ongoingQuest, setOngoingQuest] = useState([]);
  const [futureQuest, setFutureQuest] = useState([]);
  const [completedQuest, setCompletedQuest] = useState([]);
  const [modalType, setModalType] = useState<'now' | 'future' | 'past'>('now');
  const [selectedQuest, setSelectedQuest] = useState<IQuest | undefined>(
    undefined
  );

  const hasOngoing = useMemo(() => {
    return ongoingQuest.length > 0;
  }, [ongoingQuest]);

  const hasFuture = useMemo(() => {
    return futureQuest.length > 0;
  }, [futureQuest]);

  const hasCompleted = useMemo(() => {
    return completedQuest.length > 0;
  }, [completedQuest]);

  const hasCards = useMemo(() => {
    return hasOngoing || hasFuture;
  }, [hasOngoing, hasFuture]);

  useEffect(() => {
    const getSubscribedQuest = async () => {
      return await axios
        .get(`/api/mission/subscribed/${googleId}`)
        .then((response) => {
          const data = response.data;
          setOngoingQuest(data.ongoing);
          setFutureQuest(data.future);
          setCompletedQuest(data.completed);
        })
        .catch((error) => console.log(error.response.data));
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

          {hasOngoing && (
            <QuestSection
              title="In Progress"
              quests={ongoingQuest}
              setCurrentQuest={getPresentQuest}
            />
          )}

          {hasFuture && (
            <QuestSection
              title="Upcoming Quests"
              quests={futureQuest}
              setCurrentQuest={getFutureQuest}
            />
          )}

          {hasCompleted && (
            <QuestSection
              title="Past Quests"
              quests={completedQuest}
              setCurrentQuest={getPastQuest}
            />
          )}

          {!hasCards && (
            <QuestEmpty>
              <p>No quests right now.</p>
              <p>Check out Available Quests to participate in one</p>
            </QuestEmpty>
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
