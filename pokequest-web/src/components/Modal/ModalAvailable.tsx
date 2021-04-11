import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useAppContext } from '../../context/state';
import { ModalTitle, ModalTemplate, ModalBody } from './components';
import { ButtonWrapper } from '../Button/styled';

import { IQuest } from '../../interfaces';

interface Props {
  quest: IQuest;
  handleClose: () => void;
}

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
      <ButtonWrapper>
        <button type="button" onClick={() => joinQuest()}>
          Join Quest
        </button>
      </ButtonWrapper>
    </ModalTemplate>
  );
};

export default Modal;
