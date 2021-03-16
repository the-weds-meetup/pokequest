import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LoginScreen, Quests } from './pages';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginScreen />
        </Route>
        <Route exact path="/quests">
          <Quests />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
