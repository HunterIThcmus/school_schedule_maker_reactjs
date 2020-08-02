import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./page/login_signin/login";
import Signin from "./page/login_signin/signin";


function App() {
  return (<Router>
    <div className="App">
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <p className="navbar-brand">WELLCOME TO MY WEBSITE !</p>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/signin"}>Signin</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/signin" component={Signin} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
