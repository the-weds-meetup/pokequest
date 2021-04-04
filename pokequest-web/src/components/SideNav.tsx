import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { GoogleLogout } from 'react-google-login';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/state';

const SideNavLink = styled.div`
  margin: 0;
  background-color: #29b6f6;
  width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  min-height: 100vh;
  z-index: 10;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  h1 {
    padding: 0 12px;
  }
`;

const StyledLink = styled.a`
  padding-left: 4px;
  div {
    width: 98%;
    padding: 12px;
    font-size: 1.2rem;
    border-radius: 8px;

    :hover {
      background-color: #ffffff56;
    }
  }
`;

const SideNav: React.FC = (props) => {
  // const { href, name } = props;
  const router = useRouter();
  const [press, setPress] = useState(1);
  const { adminMode, setAdminMode } = useAppContext();

  const _handleLogout = () => {
    sessionStorage.clear();
    router.push('/');
  };

  const onAdminChange = () => {
    setPress(press + 1);
    // toggle adminMode on or off
    if (press >= 5) {
      setAdminMode();
      setPress(1);
    }
  };

  const adminStyles = useMemo(() => {
    return !adminMode
      ? undefined
      : {
          backgroundColor: '#ff5252',
        };
  }, [adminMode]);

  return (
    <SideNavLink style={adminStyles}>
      <h1 onClick={onAdminChange}>PokeQuest</h1>
      <NavLinkInternals />
      <GoogleLogout
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        onLogoutSuccess={_handleLogout}
      />
    </SideNavLink>
  );
};

const NavLinkInternals: React.FC = () => {
  return (
    <>
      <Link href="/quests" passHref>
        <StyledLink>
          <div>Quests</div>
        </StyledLink>
      </Link>
      <Link href="/pokemon" passHref>
        <StyledLink>
          <div>Your Pokemon</div>
        </StyledLink>
      </Link>
      <div style={{ paddingTop: 24 }} />
    </>
  );
};

export default SideNav;
