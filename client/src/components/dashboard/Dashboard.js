import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <animated.div style={props}>
        <h1 className="large text-primary">Tablero</h1>
      </animated.div>

      <motion.div       
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <p className="lead">
          <i className="fas fa-user"></i> Bienvenido {user && user.name}
        </p>
      </motion.div>
      {profile !== null ? (
        <Fragment>
          <DashboardAction className="animated bounceInDown" />
          {profile.experience.length > 0 ? (
            <>
              <Experience experience={profile.experience} />
            </>
          ) : (
            <>
              <br />
              <br />
              <h4>No has agregado experiencia</h4>
              <br />
              <br />
            </>
          )}

          {profile.education.length > 0 ? (
            <>
              <Education education={profile.education} />
            </>
          ) : (
            <>
              <br />
              <br />
              <h4>No has agregado Educación </h4>
              <br />
              <br />
            </>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <p>
            No tienes configurado en el momento un Perfil, por favor agrega
            información{" "}
          </p>
          <Link className="btn btn-primary" to="/create-profile">
            Agregar Perfil
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

// export default Dashboard
