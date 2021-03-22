import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import DefaultLayout from '../components/layouts/DefaultLayouts'
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
    console.log(response.profileObj);
    router.replace('/quests');
  }, []);

  return (
    <DefaultLayout>
      <SEO title="Login"/>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={responseGoogle}
        isSignedIn
      />
    </DefaultLayout>
  );
}

export default Login;
