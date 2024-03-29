import React, { useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  background-color: #fafafa;
  position: sticky;
  width: 400px;
  height: 60px;
  margin: 0 auto;
  border-radius: 24px;
  padding: 0 12px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 32px 12px;
  }
`;

const StyledLink = styled.a`
  height: 95%;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;

  div {
    width: 100%;
  }
  :hover {
    text-decoration: underline;
  }
`;

const Line = styled.div`
  height: 80%;
  width: 1px;
  background-color: #00000027;
  marign: 0 auto;
`;

const MissionNav: React.FC = () => {
  const router = useRouter();

  const activeStyle = useCallback(
    (href: string) => {
      return router.pathname !== href
        ? undefined
        : {
            color: '#037bff',
            textDecoration: 'underline',
          };
    },
    [router]
  );

  return (
    <Wrapper>
      <Link href="/quests" passHref>
        <StyledLink>
          <div style={activeStyle('/quests')}>Your Quests</div>
        </StyledLink>
      </Link>
      <Line />
      <Link href="/quests/available" passHref>
        <StyledLink>
          <div style={activeStyle('/quests/available')}>Available Quests</div>
        </StyledLink>
      </Link>
    </Wrapper>
  );
};

export default MissionNav;
