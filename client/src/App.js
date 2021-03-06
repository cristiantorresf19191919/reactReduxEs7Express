import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// redux
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utilities/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import Paswtest from "./components/auth/Paswtest";
import CreateProfile from "./components/dashboard/profile-form/CreateProfile";
import editProfile from "./components/dashboard/profile-form/editProfile";
import AddExperience from "./components/dashboard/profile-form/AddExperience";
import AddEducation from "./components/dashboard/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import posts from "./components/posts/posts";
import post from "./components/post/post";
import { AnimatedSwitch } from "react-router-transition";
const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);  

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <AnimatedSwitch
            atEnter={{ offset: -200 }}
            atLeave={{ offset: -200 }}
            atActive={{ offset: 0 }}
            mapStyles={(styles) => ({
              transform: `translateX(${styles.offset}%)`,
            })}          
          >
            <Route exact path="/" component={Landing} />
            <section className="container">
              <Alert />

              <Route exact path="/recovery" component={Paswtest} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-studies"
                component={AddEducation}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={editProfile}
              />
              <Route exact path="/posts" component={posts} />
              <Route exact path="/post/:id" component={post} />
              <Route exact path="/profile/:id" component={Profile} />
            </section>
          </AnimatedSwitch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
