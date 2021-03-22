import React from 'react';
import styled from 'styled-components';
import { GoogleLogout } from 'react-google-login';
import Link from 'next/link';
import { useRouter } from 'next/router';


const SideNavLink = styled.div`
  margin: 0;
  background-color: #4DD0E1;
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  h1 {
    padding: 0 12px;
  }
`;

const StyledLink = styled.a`
  div {
    width: 100%;
    padding: 12px;
    font-size: 1.2rem;

    :hover {
      background-color: #FFFFFF56;
    }
  }
`;

const SideNav: React.FC = (props) => {
  const { href, name } = props;
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/');
  };
  
  return (
    <SideNavLink>
      <h1>PokeQuest</h1>

      <Link href="/quests" passHref>
        <StyledLink><div>Quests</div></StyledLink>
      </Link>
      <Link href="/pokemon" passHref>
      <StyledLink><div>Your Pokemon</div></StyledLink>
      </Link>

      <div style={{paddingTop: 24}} />
      <GoogleLogout
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        onLogoutSuccess={handleLogout}
      />
      

    </SideNavLink>
  );
}

export default SideNav;
