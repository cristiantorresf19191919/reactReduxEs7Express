import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link, withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../../actions/profile";

const EditProfile = ({
  profile: { loading, profile },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;
  // Use effect
  useEffect(() => {
	getCurrentProfile();
	setFormData({
		company: loading || !profile.company ? ' ' : profile.company,
		website: loading || !profile.website ? ' ' : profile.website,
		location: loading || !profile.location ? ' ' : profile.location,
		status: loading || !profile.status ? ' ' : profile.status,
		skills: loading || !profile.skills ? ' ' : profile.skills.join(','),
		githubusername: loading || !profile.githubusername ? ' ' : profile.githubusername,
		bio: loading || !profile.bio ? ' ' : profile.bio,
		twitter: loading || !profile.social ? ' ' : profile.twitter,
		facebook: loading || !profile.social ? ' ' : profile.social.facebook,
		youtube: loading || !profile.social ? ' ' : profile.social.youtube,
		linkedin: loading || !profile.social ? ' ' : profile.social.linkedin,
		instagram: loading || !profile.social ? ' ' : profile.social.instagram
	});	
  }, [loading])

  // cambia valores de los inputs
  const onChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return loading && profile === null ? (
    <Redirect to="/dashboard" />
  ) : (
    <Fragment>
      <h1>company = {company}</h1>
      <h1 className="large text-primary">Edita tu Perfil</h1>
      <p className="lead">
        <i className="fas fa-user" /> Cambia informacion para destacar tu perfil
      </p>
      <small>* = campos requeridos</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Selecciona tu status profesional</option>
            <option value="Developer">Desarrollador</option>
            <option value="Junior Developer">Junior Desarrollador</option>
            <option value="Senior Developer">Senior Desarrollador</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Estudiante o Aprendiz</option>
            <option value="Instructor">Profesor o Instructor</option>
            <option value="Intern">Interno</option>
            <option value="Other">Otro</option>
          </select>
          <small className="form-text">
            Danos una idea donde estas en tu carrera
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Puede ser su propia compania o una que este trabajando
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  createProfile: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
