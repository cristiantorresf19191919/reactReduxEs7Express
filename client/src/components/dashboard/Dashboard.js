import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardAction from "./DashboardAction";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
        <DashboardAction/>  
        </Fragment>
      ) : (
        <Fragment>
          <p>No tienes configurado en el momento un Perfil, por favor agrega informacion</p>
          <Link className='btn btn-primary' to="/create-profile">Agregar Perfil</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

// export default Dashboard
