import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import LoginLayout from '../components/layouts/LoginLayout';
import SEO from '../components/SEO';

import { useAppContext } from '../context/state';

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
      <GoogleLogin
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        buttonText="Login with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={responseGoogle}
        isSignedIn
      />
    </LoginLayout>
  );
};

export default Login;
