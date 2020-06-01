import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

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
         <div className="profile-grid my-1">
             <ProfileTop profile={profile} user={auth.user} />
             <ProfileAbout profile={profile}  />\
             <div className="profile-exp bg-white p-2">
               <h2 className="text-primary">Experiencia</h2>
               {profile.experience.length > 0 ? (
                 <Fragment>
                   {profile.experience.map(experience => (
                     <ProfileExperience key={experience._id} experience={experience} />
                   ))}
                 </Fragment>
               ): (
                 <Fragment>
                   <h4>no tiene experiencia</h4>
                 </Fragment>

               )}
             
               
               </div> 
               <div className="profile-edu bg-white p-2">
                 {profile.education.length > 0 ? (
                   <>
                    {profile.education.map(education => (
                      <ProfileEducation key={education._id} education={education} />
                    ))}
                   </>
                 ) : (
                   <>
                    <h4>No tiene agregado educacion</h4>
                   </>
                 )}
               </div>
               
               <div className="profile-github">
                 {profile.githubusername && (
                   <>
                   <ProfileGithub username={profile.githubusername} />
                   </>
                 )}

               </div>
               
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
