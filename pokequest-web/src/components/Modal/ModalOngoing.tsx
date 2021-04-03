import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';

import { ModalTitle, ModalTemplate, ModalBody } from './components';

import { IQuest } from '../../interfaces';

interface Props {
  type: 'available' | 'accepted' | 'await';
  quest: IQuest;
  handleClose: () => void;
}

const JoinButton = styled.div`
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
  const router = useRouter();

  useEffect(() => {
    setGoogleId(sessionStorage.getItem('googleId'));
    setGoogleName(sessionStorage.getItem('googleName'));
  }, []);

  const joinQuest = async () => {
    setError(false);
    try {
      const payload = {
        trainer_id: googleId,
        trainer_name: googleName,
      };
      await axios
        .post('/api/mission/join/' + quest.id, payload)
        .then(() => router.push('/quests/available'));
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  return (
    <ModalTemplate type={type} quest={quest} handleClose={handleClose}>
      <ModalTitle quest={quest} handleClose={handleClose} />
      <ModalBody quest={quest} />
      <JoinButton>
        <button type="button" onClick={() => joinQuest()}>
          Join Quest
        </button>
      </JoinButton>
    </ModalTemplate>
  );
};

export default Modal;
