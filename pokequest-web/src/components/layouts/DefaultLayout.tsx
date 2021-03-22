import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-device-width: 812px) {
    padding: 0 16px;
  }
`

const DefaultLayout: React.FC = (props) => {
  const { children } = props;
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem('googleId') || !sessionStorage.getItem('googleName')) {
      router.replace('/');
    }
  });

  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

export default DefaultLayout;
