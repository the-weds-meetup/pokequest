import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext({
  adminMode: false,
  googleId: '',
  googleName: '',
  setAdminMode: () => undefined,
  setGoogleId: (google_id: string) => undefined,
  setGoogleName: (name: string) => undefined,
});

export const AppWrapper: React.FC = (props) => {
  const { children } = props;
  const [adminMode, setAdminMode] = useState(false);
  const [googleId, setGoogleId] = useState('');
  const [googleName, setGoogleName] = useState('');

  useEffect(() => {
    setAdminMode(sessionStorage.getItem('admin') === 'true');
    setGoogleId(sessionStorage.getItem('googleId'));
    setGoogleName(sessionStorage.getItem('googleName'));
  }, []);

  const changeAdminMode = () => {
    const toggleMode = !adminMode;
    setAdminMode(toggleMode);
    sessionStorage.setItem('admin', `${toggleMode}`);
    console.log('[admin mode]', toggleMode);
  };

  const updateGoogleId = (google_id: string) => {
    setGoogleId(google_id);
    sessionStorage.setItem('googleId', google_id);
  };

  const updateGoogleName = (name: string) => {
    setGoogleName(name);
    sessionStorage.setItem('googleName', name);
  };

  const sharedState = {
    adminMode: adminMode,
    googleId: googleId,
    googleName: googleName,
    setAdminMode: changeAdminMode,
    setGoogleId: updateGoogleId,
    setGoogleName: updateGoogleName,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
