import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

import { IQuest } from '../../../interfaces';

interface Props {
  quest: IQuest;
  handleClose: () => void;
}

const HeaderWrapper = styled.div`
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

const ModalHeader: React.FC<Props> = (props) => {
  const { quest, handleClose } = props;
  const [timezoneStr, setTimezoneStr] = useState('UTC');
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
    getTime();
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
    <HeaderWrapper>
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
    </HeaderWrapper>
  );
};

export default ModalHeader;
