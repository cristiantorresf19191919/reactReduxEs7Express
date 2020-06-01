import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ logOut, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
        <i className="fas fa-user">{' '} </i>
        <span className='hide-sm'> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          Desarrolladores
        </Link>
      </li>
      <li>
        <Link to="/posts">
          Posts
        </Link>
      </li>
      <li>
        <a onClick={logOut} href="#!">
          <i className="fas fa-sign-out-alt"></i> <span> Cerrar Sesion</span>
        </a>
      </li>
     
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
      <Link to="/profiles">
          Desarrolladores
        </Link>
      </li>

      <li>
        <Link to="/Register">Registro</Link>
      </li>
      <li>
        <Link to="/Login">Login</Link>
      </li>



      <li>
        
      </li>
    </ul>
  );
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> CRISTIANSCRIPT
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </div>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

Navbar.propTypes = {
  auth: PropTypes.object,
  isloggedIn: PropTypes.bool
};

export default connect(mapStateToProps, { logOut })(Navbar);
