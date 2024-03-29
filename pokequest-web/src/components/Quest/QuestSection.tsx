import React from 'react';
import styled from 'styled-components';
import QuestCard from './QuestCard';

import { IQuest } from '../../interfaces';

interface Props {
  title: string;
  quests: IQuest[];
  setCurrentQuest?: (quest: IQuest) => void | undefined;
}

const Section = styled.div`
  h3 {
    margin: 0;
    margin: 16px 0;
    font-size: 0.9rem;
    color: #00000087;
  }
`;

const QuestSection: React.FC<Props> = (props) => {
  const { quests, title, setCurrentQuest } = props;

  return (
    <Section>
      <h3>{title}</h3>
      {quests.map((quest, index) => (
        <QuestCard
          key={index}
          quest={quest}
          setCurrentQuest={setCurrentQuest}
        />
      ))}
    </Section>
  );
};

QuestSection.defaultProps = {
  setCurrentQuest: undefined,
};

export default QuestSection;
