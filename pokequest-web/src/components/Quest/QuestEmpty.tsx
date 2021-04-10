import React from 'react';
import { Card } from './styled';
import styled from 'styled-components';

const EmptyCard = styled(Card)`
  cursor: initial;
  display: initial;
  text-align: initial;

  p {
    margin: 0;
    padding: 8px 8px;
    line-height: 1.5rem;
  }

  a {
    text-decoration: underline;
    color: #037bff;
  }
`;

const QuestCard: React.FC = (props) => {
  const { children } = props;
  return <EmptyCard>{children}</EmptyCard>;
};

export default QuestCard;
