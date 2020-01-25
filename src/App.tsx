import React from 'react';
import { MainPage } from './views/Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route component={MainPage} path="/" exact></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
