import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import axios from 'axios';

import { ModalBody } from './ModalBody';

import { IPokemonCount, IQuest } from '../../interfaces';

interface Props {
  type: 'available' | 'accepted' | 'await';
  quest: IQuest;
  handleClose: () => void;
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000060;

  .modal-card {
    position: fixed;
    background: #ffffff;
    width: 80%;
    height: auto;
    min-height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 32px;
    border-radius: 8px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding-bottom: 16px;
  border-bottom: #00000027 1px solid;

  button {
    height: inherit;
    border: 0;
    display: flex;
    background-color: #fff;
  }

  p {
    margin: 0;
    font-weight: 500;
    color: #00000078;
  }

  h1 {
    margin: 0;
    padding-bottom: 8px;
  }
`;

const Modal: React.FC<Props> = (props) => {
  const { quest, handleClose, children } = props;
  const [timezoneStr, setTimezoneStr] = useState('UTC');
  const [missionPokemonCount, setmissionPokemonCount] = useState<
    IPokemonCount[]
  >([]);
  // const []

  useEffect(() => {
    const getTime = () => {
      const date = new Date();
      const offset = date.getTimezoneOffset() / -60;

      switch (true) {
        case offset > 0:
          setTimezoneStr(`UTC +${offset}`);
          return;

        case offset < 0:
          setTimezoneStr(`UTC ${offset}`);
          return;

        default:
          setTimezoneStr('UTC');
      }
    };

    const getPokemonCollected = async () => {
      const server_count = await axios
        .get(
          `${process.env.NEXT_PUBLIC_MISSION_MANAGEMENT}/mission/info/count/${quest.id}`
        )
        .then((response) => response.data.data);
      setmissionPokemonCount(server_count);
    };

    getTime();
    getPokemonCollected();
  }, []);

  const title = useMemo(() => {
    const { start_time, end_time } = quest;
    const start = parseInt(start_time);
    const end = parseInt(end_time);
    const now = Date.now();

    switch (true) {
      // quest has been finished
      case now >= end:
        return 'Completed';

      // quest is happening now
      case now >= start:
        return 'Ongoing';

      // quest has yet to start
      case now < start:
        return 'Upcoming';

      // most likely an error occured here
      default:
        console.log('modal title: you should not be here');
        return 'Quest';
    }
  }, [quest]);

  const toTimeString = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hour = date.getHours();
    const mins = date.getMinutes();

    const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
    const minsStr = mins < 10 ? `0${mins}` : `${mins}`;

    return `${day}/${month}/${year} ${hourStr}:${minsStr}`;
  };

  const questPeriodStr = useMemo(() => {
    const { start_time, end_time } = quest;
    const start = new Date(parseInt(start_time));
    const end = new Date(parseInt(end_time));
    const startStr = toTimeString(start);
    const endStr = toTimeString(end);

    return `${startStr} – ${endStr}`;
  }, [quest]);

  return (
    <ModalWrapper>
      <div className="modal-card">
        <ModalHeader>
          <div>
            <h1>{title}</h1>
            <p>
              {questPeriodStr} ({timezoneStr})
            </p>
          </div>
          <button onClick={handleClose}>
            <Icon
              path={mdiClose}
              size={1.4}
              horizontal
              vertical
              color="#00000087"
            />
          </button>
        </ModalHeader>
        <ModalBody quest={quest} pokemonCount={missionPokemonCount} />
        {children}
      </div>
    </ModalWrapper>
  );
};

export default Modal;
