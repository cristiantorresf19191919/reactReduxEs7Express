import React from "react";

import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component, 
  auth: { isAuthenticated, loading },
  ...rest
}) => {    
  return (
    <div>
      <Route
        {...rest}
        render={props =>
          !isAuthenticated && !loading ? 
            <Redirect to="login" />
           : 
            <Component {...props} />          
            }
      />
    </div>
  );
};

PrivateRoute.propTypes = {};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
