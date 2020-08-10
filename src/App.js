import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./page/login_signin/Login";
import SignUp from "./page/login_signin/Signup";
import Class from "./page/class/Group_Class";
import Class from "./page/view/Class";
import Teacher from "./page/view/Teacher"

function App() {
  return (<Router>
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/class" component={Class}/>
              <Route path="/teacher" component={Teacher}/>
            </Switch>
          </div>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
