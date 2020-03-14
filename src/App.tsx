import React from 'react';
import { HashRouter, Switch } from 'react-router-dom'
import './styles/reset.scss'
import CustomRoute from '../src/router/routerView'
import { Provider as MoxProvider } from 'mobx-react'
import store from './store'
function App() {
  return (

    <MoxProvider store={store}>
      <HashRouter>
        <Switch>
          <CustomRoute />
        </Switch>
      </HashRouter>
    </MoxProvider>
  )
}

export default App;
