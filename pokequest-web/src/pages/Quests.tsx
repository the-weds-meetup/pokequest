import React, { useCallback, useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const Screen = styled.div`
  margin: 0 auto;
`;

const Quests: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    console.log('bye');
    history.push('/');
  };

  return (
    <Screen>
      <p>Hello</p>
      <GoogleLogout
        clientId={process.env.GOOGLE_CLIENT_ID}
        onLogoutSuccess={handleLogout}
      />
    </Screen>
  );
};

export default Quests;
