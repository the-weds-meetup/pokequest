import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';

import {
  ModalTitle,
  ModalTemplate,
  ModalBody,
  TabBar,
  ModalSend,
} from './components';

import { IQuest } from '../../interfaces';

interface Props {
  type: 'now' | 'future' | 'past';
  quest: IQuest;
  handleClose: () => void;
}

const Button = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 32px;

  button {
    margin: 0 auto;
    padding: 16px 32px;
    min-width: 300px;

    background-color: #037bff;
    border-radius: 4px;
    border: #00000027 1px solid;
    color: white;
    font-size: 1.2em;
  }
`;

const Modal: React.FC<Props> = (props) => {
  const { type, quest, handleClose } = props;
  const [error, setError] = useState(false);
  const [googleName, setGoogleName] = useState('');
  const [googleId, setGoogleId] = useState('');
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const tabNames = ['Global Stats', 'Send Pokemon'];
  const router = useRouter();

  useEffect(() => {
    setGoogleId(sessionStorage.getItem('googleId'));
    setGoogleName(sessionStorage.getItem('googleName'));
  }, []);

  const changeTab = (tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  return (
    <ModalTemplate>
      <ModalTitle
        quest={quest}
        handleClose={handleClose}
        tabNames={tabNames}
        currentIndex={currentTabIndex}
        handleTabChange={changeTab}
      />

      {currentTabIndex === 0 ? (
        <ModalBody quest={quest} />
      ) : (
        <ModalSend quest={quest} />
      )}
    </ModalTemplate>
  );
};

export default Modal;
