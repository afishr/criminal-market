import React from 'react';
import { MainPage } from './views/Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MapPage } from './views/Map';
import { MapCapitalPage } from './views/MapCapital';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route component={MainPage} path="/" exact></Route>
          <Route component={MapPage} path="/map" exact></Route>
          <Route component={MapCapitalPage} path="/map/chisinau" exact></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
