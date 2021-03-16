import React, { useCallback, useState } from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const Screen = styled.div`
  margin: 0 auto;
`;

const LoginScreen: React.FC = () => {
  const history = useHistory();
  const [googleUser, setGoogleUser] = useState<
    GoogleLoginResponse['profileObj'] | null
  >(null);

  const responseGoogle = (response: GoogleLoginResponse) => {
    console.log(response);
  };

  const handleGoogleSuccess = useCallback((response: GoogleLoginResponse) => {
    setGoogleUser(response.profileObj);
    history.replace('/quests');
    console.log(response.profileObj);
  }, []);

  return (
    <Screen>
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={responseGoogle}
        isSignedIn
      />
    </Screen>
  );
};

export default LoginScreen;
