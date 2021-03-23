import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GoogleLogout } from 'react-google-login';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

const Wrapper = styled.button`
  height: 96px;
  display: flex;
  flex-direction: rows;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  border-style: dotted;
  border-width: 3px;
  background-color: transparent;
  cursor: pointer;

  :hover {
    background-color: #00000012;
  }

  span {
    padding-left: 8px;
    color: #00000087
  }
`;

const AddButton: React.FC = () => {
  const router = useRouter();
  
  const _onClick = () => {
    router.push('/quests/add');
  }

  return (
    <Wrapper onClick={_onClick}>
      <Icon 
        path={mdiPlus}
        size={1}
        horizontal
        vertical
        color='#00000087'
      />
      <span> Add a Quest</span>
    </Wrapper>
  )
}

export default AddButton;