import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import SEO from '../../components/SEO';
import SideNav from '../../components/SideNav';
import MissionNav from '../../components/MissionNav';
import AddButton from '../../components/AddMissionBtn';

const Content = styled.main`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Quests: React.FC = () => {
  const router = useRouter();
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    setAdminMode(sessionStorage.getItem('admin') === 'true');
  }, []);

  return (
    <>
      <SEO title={'Available Quests'} />
      <SideNav />
      <DefaultLayout>
        <Content>
          <MissionNav />
          <div style={{ height: '48px' }} />

          {adminMode && <AddButton />}

          <div
            style={{
              padding: '24px',
              width: '100%',
              height: '120px',
              backgroundColor: 'pink',
            }}
          />
          <div
            style={{
              padding: '24px',
              width: '100%',
              height: '120px',
              backgroundColor: 'pink',
            }}
          />
          <div
            style={{
              padding: '24px',
              width: '100%',
              height: '120px',
              backgroundColor: 'pink',
            }}
          />
          <div
            style={{
              padding: '24px',
              width: '100%',
              height: '120px',
              backgroundColor: 'pink',
            }}
          />
          <div
            style={{
              padding: '24px',
              width: '100%',
              height: '120px',
              backgroundColor: 'pink',
            }}
          />
          <div
            style={{
              padding: '24px',
              width: '100%',
              height: '120px',
              backgroundColor: 'pink',
            }}
          />
        </Content>
      </DefaultLayout>
    </>
  );
};

export default Quests;
