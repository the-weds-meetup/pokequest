import React, { useCallback, useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import DefaultLayout from '../../components/layouts/DefaultLayouts'



const Quests: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    console.log('bye');
    router.push('/');
  };

  return (
    <DefaultLayout>
      <p>Hello</p>
      <GoogleLogout
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        onLogoutSuccess={handleLogout}
      />
    </DefaultLayout>
  );
};

export default Quests;
