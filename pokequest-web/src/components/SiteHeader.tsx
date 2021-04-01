import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 2.5rem;
`;

interface Props {
  title: string;
}

const Header: React.FC<Props> = (props) => {
  const { title } = props;

  return <Title>{title}</Title>;
};

export default Header;
