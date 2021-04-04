import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useAppContext } from '../../context/state';

const Wrapper = styled.div`
  display: block;
  flex-direction: row;
  width: calc(100% - 250px);
  min-height: 100vh;
  left: 250px;
  top: 0;
  right: 0;
  flex: 1;

  position: absolute;
`;

const DefaultLayout: React.FC = (props) => {
  const { children } = props;
  const { googleName, googleId } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!googleName || !googleId) {
      router.replace('/');
    }
  });

  return <Wrapper>{children}</Wrapper>;
};

export default DefaultLayout;
