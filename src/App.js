import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getUser } from './Components/Auth/Session/Session';

import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Admin from './Components/Admin/Admin';
import Home from './Components/Home/Home';

import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      isLoggedIn: false
    }
  }

  toggleLogin = () => {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      let adminCheck = getUser();
      return (
        <div className="App">
          <BrowserRouter>
            <Switch>
              {
                adminCheck.isAdmin ?
                  <Route exact path='/admin' component={() => <Admin toggleLogin={this.toggleLogin} />} />
                  :
                  <Route exact path='/home' component={() => <Home toggleLogin={this.toggleLogin} />} />
              }
            </Switch>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={() => <Login toggleLogin={this.toggleLogin} />} />
              <Route exact path='/login' component={() => <Login toggleLogin={this.toggleLogin} />} />
              <Route exact path='/register' component={() => <Register />} />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
  }
}

export default App;
