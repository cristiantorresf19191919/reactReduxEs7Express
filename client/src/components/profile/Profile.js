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
  let number = "5022766435";  
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
        {profile.user.whatsapp && <a href={`https://wa.me/1${profile.user.whatsapp}?text=hey`} className="badge-success p-2 my-2">Contact</a>}
         <div className="profile-grid my-1">
             <ProfileTop profile={profile} />
             <ProfileAbout profile={profile}  />
             <div className="profile-exp bg-white p-2">
               <h2 className="text-primary">Experiencia</h2>
               {profile.experience && profile.experience.length > 0 ? (
                 <>
                 {
                   profile.experience.map(experience => (
                     <ProfileExperience key={profile._id} experience={experience} />
                     ))

                 }
                 </>
               ) : (
                 <Fragment>
                   <h4>Aun no ha agregado la experiencia</h4>
                 </Fragment>
               )
               
               
               }               
               </div> 
               <div className="profile-edu bg-white p-2">
                  <h2 className="text-primary">Educacion</h2>
                  {profile.education && profile.education.length > 0 ? (
                      <>
                      {profile.education.map(edu => (
                        <ProfileEducation key={edu._id} education={edu} />
                      ))}
                      </>
                  ) : (
                    <>
                    <h4 >Aun no se ha agregado educacion</h4>
                    </>
                  )}
               </div>
               {profile.githubusername && (
                 <ProfileGithub username = {profile.githubusername}/>
               )}

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
