import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;

  @media only screen and (max-device-width: 812px) {
    padding: 0 16px;
  }
`;

const DefaultLayout: React.FC = (props) => {
  const { children } = props;

  return <Wrapper>{children}</Wrapper>;
};

export default DefaultLayout;
