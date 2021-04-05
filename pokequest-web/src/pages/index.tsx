import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import LoginLayout from '../components/layouts/LoginLayout';
import styled from 'styled-components';
import SEO from '../components/SEO';

import { useAppContext } from '../context/state';

const BackgroundImageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url('/images/background.png');
  background-size: cover;
`;

const ModalWrapper = styled.div`
  position: fixed;
  background: #fafafa;
  width: 40%;
  min-width: 350px;
  height: auto;
  height: 40%;
  max-height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0px 2px #00000027;

  @media only screen and (max-width: 600px) {
    width: 90%;
    padding: 32px 12px;

    h1 {
      font-size: 1.6rem;
    }
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .instructions {
    width: 100%;

    h1 {
      font-size: 3.4rem;
      margin: 0;

      padding-bottom: 16px;
    }

    h3 {
      font-weight: 400;
      margin: 0;
    }
  }
`;

// Show Login Screen
const Login: React.FC = () => {
  const router = useRouter();
  const { setGoogleId, setGoogleName } = useAppContext();

  const responseGoogle = (response: GoogleLoginResponse) => {
    console.log(response);
  };

  const handleGoogleSuccess = useCallback((response: GoogleLoginResponse) => {
    // store in sessions
    setGoogleId(response.profileObj.googleId);
    setGoogleName(response.profileObj.name);

    router.replace('/quests');
  }, []);

  return (
    <LoginLayout>
      <SEO title="Login" />
      <BackgroundImageWrapper>
        <ModalWrapper>
          <div className="instructions">
            <h1>PokeQuest</h1>
            <h3>Welcome!</h3>
            <h3>Professor Oak needs your help!</h3>
          </div>

          <GoogleLogin
            clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
            buttonText="Login with Google"
            onSuccess={handleGoogleSuccess}
            onFailure={responseGoogle}
            isSignedIn
          />
        </ModalWrapper>
      </BackgroundImageWrapper>
    </LoginLayout>
  );
};

export default Login;
