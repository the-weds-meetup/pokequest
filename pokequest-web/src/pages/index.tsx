import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import LoginLayout from '../components/layouts/LoginLayout'
import SEO from '../components/SEO';

// Show Login Screen
const Login: React.FC = () => {
  const router = useRouter();
  const [googleUser, setGoogleUser] = useState<GoogleLoginResponse['profileObj'] | null>(null);

  const responseGoogle = (response: GoogleLoginResponse) => {
    console.log(response);
  };

  const handleGoogleSuccess = useCallback((response: GoogleLoginResponse) => {
    setGoogleUser(response.profileObj);
    
    // store in sessions
    sessionStorage.setItem('googleId', response.profileObj.googleId);
    sessionStorage.setItem('googleName', response.profileObj.name);

    router.replace('/quests');
  }, []);

  return (
    <LoginLayout>
      <SEO title="Login"/>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={responseGoogle}
        isSignedIn
      />
    </LoginLayout>
  );
}

export default Login;
