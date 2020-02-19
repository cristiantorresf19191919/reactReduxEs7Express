import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, []);

  return (
    <Fragment>
     {profile === null || loading ? (<Spinner/> ): (<Fragment>
         <Link to="/profiles" className="btn btn-light"> <i className="fas fa-backward"></i> Back</Link>
         {auth.isAuthenticated && auth.loading === false && loading === false && 
         auth.user._id === profile.user._id && (
         <Fragment>
            <p className="lead my-2">Este es tu perfil puedes editarlo</p>
            <Link to="/edit-profile" className="btn btn-light"><i className="fas fa-edit"></i> Edit Profile</Link>
            </Fragment> )
         }
         <div className="profile-grid">
             <ProfileTop profile={profile} user={auth.user} />

         </div>





         
         </Fragment>)}
           
         
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
