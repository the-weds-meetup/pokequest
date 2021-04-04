import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useAppContext } from '../../context/state';
import { ModalTitle, ModalTemplate, ModalBody } from './components';

import { IQuest } from '../../interfaces';

interface Props {
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
    cursor: pointer;
  }
`;

const Modal: React.FC<Props> = (props) => {
  const { quest, handleClose } = props;
  const [error, setError] = useState(false);
  const { googleName, googleId } = useAppContext();
  const router = useRouter();

  const joinQuest = async () => {
    setError(false);
    try {
      const payload = {
        trainer_id: googleId,
        trainer_name: googleName,
      };
      await axios
        .post('/api/mission/join/' + quest.id, payload)
        .then(() => router.push('/quests'));
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  return (
    <ModalTemplate>
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
