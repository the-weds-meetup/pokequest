import React from 'react';
import styled from 'styled-components';
import QuestCard from './QuestCard';

interface Props {
  title: string;
  quests: {
    id: number;
    start_time: string;
    end_time: string;
    creation_time: string;
    is_complete: boolean;
    pokemon: Pokemon[];
  }[];
}

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  official_artwork: string;
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
  const { quests, title } = props;

  return (
    <Section>
      <h3>{title}</h3>
      {quests.map((quest, index) => (
        <QuestCard key={index} quest={quest} />
      ))}
    </Section>
  );
};

export default QuestSection;
