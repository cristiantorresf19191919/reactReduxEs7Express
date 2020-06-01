import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link, withRouter } from "react-router-dom";
import { createProfile } from "../../../actions/profile";

const CreateProfile = ({
  profile: { loading, profile },
  createProfile,
  history,
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
    instagram: "",
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
    instagram,
  } = formData;
  // cambia valores de los inputs
  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return loading && profile === null ? (
    <Redirect to="/dashboard" />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Crea tu Perfil</h1>
      <p className="lead">
        <i className="fas fa-user" /> Pon informacion para destacar tu perfil
      </p>
      <small>* = campos requeridos</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Selecciona tu status profesional</option>
            <option value="Desarrollador">Desarrollador</option>
            <option value="Desarrollador Junior">Desarrollador Junior</option>
            <option value="Desarrollador SemiSenior">
              Desarrollador SemiSenior
            </option>
            <option value="Desarrollador Senior">Desarrollador Senior</option>
            <option value="Manager">Manager</option>
            <option value="Estudiante o Aprendiz">Estudiante o Aprendiz</option>
            <option value="Instructor">Profesor o Instructor</option>
            <option value="Interno">Interno</option>
            <option value="Otro">Otro</option>
          </select>
          <small className="form-text">
            Danos una idea donde estas en tu carrera
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Compañía"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Puede ser su propia Compañía o una que estes trabajando
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Puede ser la tuya propia o la de tu empresa
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="ubicación"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Habilidades"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Utiliza valores separados por comas (por ejemplo, HTML, CSS,
            JavaScript, PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Usuario de Github"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
		  Si deseas tus últimos repositorios y un enlace de Github, incluya su nombre de usuario
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Una breve biografía tuya"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Cuéntanos un poco sobre ti</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Agregar enlaces de redes sociales
          </button>
          <span>Opcional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Url de Twitter"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Url de Facebook"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="Url de Youtube"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Url de Linkedin"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Url de Instagram"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" value="Crear Perfil" />
        <Link className="btn btn-light my-1" to="/dashboard">
		Regresa
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToChange = (state) => ({
  auth: state.auth,
  profile: state.profile,
  createProfile: PropTypes.func.isRequired,
});

export default connect(mapStateToChange, { createProfile })(
  withRouter(CreateProfile)
);
