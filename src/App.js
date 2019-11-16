import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from '../src/containers/Login'
import Planets from '../src/containers/Planets'

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path="/planets" component={Planets} />
        <Route path="/" component={Login} />
      </Switch>
    );

    return (
      <div className='App'>
        <header className='App-header'>
          STAR WARS
        </header>
        {routes}
      </div>
    );
  }
}


export default App;
