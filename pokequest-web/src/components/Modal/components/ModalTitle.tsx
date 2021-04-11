import React, { useMemo, useState, useEffect } from 'react';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { TabBar } from './';
import { Title, TitleWrapper } from './styled';

import { IQuest } from '../../../interfaces';

interface Props {
  quest: IQuest;
  tabNames?: string[];
  currentIndex?: number;
  handleClose: () => void;
  handleTabChange?: (index: number) => void;
}

const ModalHeader: React.FC<Props> = (props) => {
  const { quest, tabNames, currentIndex, handleTabChange, handleClose } = props;
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
    <TitleWrapper>
      <Title>
        <h1>{title}</h1>
        <button onClick={handleClose}>
          <Icon path={mdiClose} size={1.4} horizontal color="#00000087" />
        </button>
      </Title>
      <p>
        {questPeriodStr} ({timezoneStr})
      </p>

      {tabNames.length === 0 ? (
        <div className="padding" />
      ) : (
        <TabBar
          currentIndex={currentIndex}
          tabNames={tabNames}
          handleTabChange={handleTabChange}
        />
      )}
    </TitleWrapper>
  );
};

ModalHeader.defaultProps = {
  currentIndex: 0,
  tabNames: [],
  handleTabChange: undefined,
};

export default ModalHeader;
