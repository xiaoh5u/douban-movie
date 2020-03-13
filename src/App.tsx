import React from 'react';
import { HashRouter, Switch } from 'react-router-dom'
import './styles/reset.scss'
import CustomRoute from '../src/router/routerView'

function App() {
  return (
    <HashRouter>
      <Switch>
        <CustomRoute />
      </Switch>
    </HashRouter>
  )
}

export default App;
