import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // withRouter,
} from "react-router-dom";
import Login from "./page/login_signin/Login";
import Signup from "./page/login_signin/Signup";
import Class from "./page/class/Group_Class";
// import Class from "./page/view/Class";
import Teacher from "./page/view/Teacher";
import TeacherList from "./page/view/TeacherList";
import Header from "./components/Header";
// import Footer from "./components/Footer";
// import BreadcrumbPage from "./components/BreadcrumbPage";

function App() {
  const router = new Router().history;
  return (
    <Router>
      <div className="App">
        {router.location.pathname !== "/Login" &&
        router.location.pathname !== "/Signup" ? (
          <Header />
        ) : null}
        <div className="container">
        {/* <BreadcrumbPage /> */}

          <div className="row">
            <div className="col-md-12">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/class" component={Class} />
                <Route path="/teacher" component={Teacher} />
                <Route path="/teacherList" component={TeacherList} />
              </Switch>
            </div>
          </div>
        </div>
        {/* {router.location.pathname !== "/Login" &&
        router.location.pathname !== "/Signup" ? (
          <Footer />
        ) : null} */}
      </div>
    </Router>
  );
}

export default App;
