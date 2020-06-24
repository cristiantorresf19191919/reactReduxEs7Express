import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Typist from "react-typist";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner ">
            <div className="dark-text">
              <Typist avgTypingDelay={20} cursor={{ show: false }}>
                <h1 className="x-large">CRISTIAN SCRIPT NETWORK</h1>

                <p className="lead">
                  Crea tu Portafolio, comparte post y obten ayude de otros
                  programadores
                </p>
                <p className="lead">GENIAL! ....</p>
                <Typist.Backspace count={14} delay={200} />
                <p className="lead">
                  {" "}
                  registrate para empezar a publicar y comentar tus dudas
                </p>
              </Typist>
              <div className="buttons">
                <Link
                  to="/Register"
                  className="btn btn-primary animate__animated animate__bounce animate__delay-9s animate__repeat-2"
                >
                  Registrate
                </Link>
                <Link to="/Login" className="btn btn-light>">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Landing.propType = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Landing);
