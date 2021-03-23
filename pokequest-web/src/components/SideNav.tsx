import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GoogleLogout } from 'react-google-login';
import Link from 'next/link';
import { useRouter } from 'next/router';


const SideNavLink = styled.div`
  margin: 0;
  background-color: #29B6F6;
  width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  min-height: 100vh;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  h1 {
    padding: 0 12px;
  }
`;

const SideNavLinkAdmin = styled(SideNavLink)`
  background-color: #FF5252;
`;

const StyledLink = styled.a`
  padding-left: 4px;
  div {
    width: 98%;
    padding: 12px;
    font-size: 1.2rem;
    border-radius: 8px;

    :hover {
      background-color: #FFFFFF56;
    }
  }
`;

const AdminButton = styled.button`
  font-size: 2rem;
  text-align: left;
`;

const SideNav: React.FC = (props) => {
  // const { href, name } = props;
  const router = useRouter();
  const [press, setPress] = useState(1);
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    setAdminMode(
      sessionStorage.getItem('admin') === 'true'
    );
  }, []);

  const _handleLogout = () => {
    sessionStorage.clear();
    router.push('/');
  };

  const _activateAdmin = () => {
    setPress(press + 1);
    // toggle adminMode on or off
    if (press >= 5) {
      const toggleMode = !adminMode;
      setAdminMode(toggleMode);
      sessionStorage.setItem('admin', `${toggleMode}`);
      setPress(1);

      console.log('[admin mode]', toggleMode);
    }
  }
  
  return adminMode ? (
    <SideNavLinkAdmin>
      <h1 onClick={_activateAdmin}>PokeQuest</h1>
      <NavLinkInternals />
      <GoogleLogout
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        onLogoutSuccess={_handleLogout}
      />
    </SideNavLinkAdmin>
  ) : (
    <SideNavLink>
      <h1 onClick={_activateAdmin}>PokeQuest</h1>
      <NavLinkInternals />
      <GoogleLogout
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        onLogoutSuccess={_handleLogout}
      />
    </SideNavLink>
  );
}

const NavLinkInternals: React.FC = () => {
  return (
    <>
      <Link href="/quests" passHref>
        <StyledLink><div>Quests</div></StyledLink>
      </Link>
      <Link href="/pokemon" passHref>
        <StyledLink><div>Your Pokemon</div></StyledLink>
      </Link>
      <div style={{paddingTop: 24}} />
    </>
  )
}

export default SideNav;
