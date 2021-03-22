import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import DefaultLayout from '../../components/layouts/DefaultLayout'
import SEO from '../../components/SEO';
import SideNav from '../../components/SideNav'
import MissionNav from '../../components/MissionNav'


const Content = styled.main`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Quests: React.FC = () => {
  const router = useRouter();

  return (
    <DefaultLayout>
      <SEO title={'Quests'} />
      <SideNav />

      <Content>
       <MissionNav />
      </Content>
    </DefaultLayout>
  );
};

export default Quests;
