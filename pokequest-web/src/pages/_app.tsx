import React from 'react';
import type { AppProps } from 'next/app';

import 'normalize.css';
import '../styles/globals.css';

import { AppWrapper } from '../context/state';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppWrapper>
      <Component {...pageProps} />;
    </AppWrapper>
  );
};

export default MyApp;
