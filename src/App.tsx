

import React from 'react';
import routes from './router/config';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'// 与路由相关的内置组件


function App() {
  return (

        <HashRouter>
            <Switch>
              <Redirect from="/" to="/home" exact />
              {routes.map(e => <Route {...e} />)}
            </Switch>
        </HashRouter>
      
  )
}

export default App;
