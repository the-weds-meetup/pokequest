import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { GoogleLogout } from 'react-google-login';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/state';
import { mdiClose, mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import { useMediaQuery } from 'react-responsive';

const SideNavLink = styled.div`
  margin: 0;
  background-color: #29b6f6;
  width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  min-height: 100vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 10;

  h1 {
    padding: 0 12px;
  }

  .custom {
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
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: auto;
    padding: 32px 12px;
    min-height: auto;

    h1 {
      font-size: 2rem;
    }
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

const OpenMenu = styled.button`
  width: 50px;
  background-color: #ffffff00;
  border: none;
  cursor: pointer;
  top: 24px;
  left: 12px;
  position: fixed;
  z-index: 10;
`;

const CloseWrapper = styled.button`
  width: 50px;
  background-color: #ffffff00;
  border: none;
  cursor: pointer;
`;

const SideNav: React.FC = () => {
  const router = useRouter();
  const [press, setPress] = useState(1);
  const {
    adminMode,
    isSideOpen,
    toggleSideBar,
    setAdminMode,
  } = useAppContext();
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

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

  return !isSideOpen && isMobile ? (
    <OpenMenu onClick={toggleSideBar}>
      <Icon path={mdiMenu} size={1.4} horizontal color="#00000087" />
    </OpenMenu>
  ) : (
    <SideNavLink style={adminStyles}>
      {isMobile && (
        <CloseWrapper onClick={toggleSideBar}>
          <Icon path={mdiClose} size={1.4} horizontal color="#00000087" />
        </CloseWrapper>
      )}
      <h1 onClick={onAdminChange}>PokeQuest</h1>
      <NavLinkInternals />
      <GoogleLogout
        clientId={process.env.GOOGLE_CLIENT_ID}
        onLogoutSuccess={_handleLogout}
      />
    </SideNavLink>
  );
};

const NavLinkInternals: React.FC = () => {
  const router = useRouter();

  const activeStyle = useCallback(
    (href: string) => {
      return !router.pathname.includes(href)
        ? undefined
        : {
            backgroundColor: '#ffffff56',
            color: '#037bff',
          };
    },
    [router]
  );

  return (
    <>
      <Link href="/quests" passHref>
        <StyledLink>
          <div style={activeStyle('/quests')}>Quests</div>
        </StyledLink>
      </Link>
      <Link href="/pokemon" passHref>
        <StyledLink>
          <div style={activeStyle('/pokemon')}>Your Pokemon</div>
        </StyledLink>
      </Link>
      <a className="custom" href={process.env.TWITTER_URL} target="_blank">
        <div>Twitter</div>
      </a>
      <div style={{ paddingTop: 24 }} />
    </>
  );
};

export default SideNav;
