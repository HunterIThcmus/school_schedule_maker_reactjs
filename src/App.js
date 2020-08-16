import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./page/login_signin/Login";
import Signup from "./page/login_signin/Signup";
import Class from "./page/class/Group_Class";
// import Class from "./page/view/Class";
import Teacher from "./page/view/Teacher";
import TeacherList from "./page/view/TeacherList";
import Header from "./components/Header";
import PageError from "./components/PageError";
import Home from "./page/view/Home";

// import Footer from "./components/Footer";
// import BreadcrumbPage from "./components/BreadcrumbPage";

function App() {
  const router = new Router().history;
  return (
    <Router>
      <div className="App">
        {router.location.pathname !== "/" &&
          router.location.pathname !== "/login" &&
          router.location.pathname !== "/Login" &&
          router.location.pathname !== "/404" &&
          router.location.pathname !== "/SignUp" ? (
            <Header />
          ) : null}
        <div className="container">
          <div >
            <div >
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/class" component={Class} />
                <Route path="/teacher" component={Teacher} />
                <Route path="/teacherlist" component={TeacherList} />
                <Route path="/404" component={PageError} />
                <Redirect from='*' to='/404' />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
