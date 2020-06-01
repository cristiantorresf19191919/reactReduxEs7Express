import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {addEducation} from '../../../actions/profile'

const AddEducation = ({addEducation, history}) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });
    const {school, degree, fieldofstudy, from, to, current, description} = formData;
    const [toDateDisabled, toggleDate] = useState(false)
    const onChange = event => setFormData({...formData, [event.target.name] : event.target.value})

    return (
        <Fragment>

            <h1 className="large text-primary">
            Agrega tu educación
      </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Agregue cualquier escuela, bootcamp, etc. que has asistido
      </p>
            <small>* = campo requerido</small>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                addEducation(formData, history)

            }}>
                <div className="form-group">
                    <input
                        type="text"
                        value={school}
                        onChange = {e => onChange(e)}
                        placeholder="* Escuela o campo de entrenamiento"
                        name="school"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Licenciatura o Certificado"
                        name="degree"
                        value = {degree}
                        onChange = {e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Campo de estudio" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>Fecha de Inicio</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)}  />
                </div>
                <div className="form-group">
                    <p>
                      
                        <input type="checkbox" name="current" value={current} checked={toDateDisabled} onChange={e => {setFormData({...formData, current: !current}); toggleDate(!toDateDisabled)}} /> Current School or Bootcamp
          </p>
                </div>
                <div className="form-group">
                    <h4>Fecha Fin</h4>
                    <input type="date" value={to} onChange={e => onChange(e)} name="to" disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Descripción del programa"
                        value={description}
                        onChange={e=>{onChange(e)}}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Enviar" />
                <Link className="btn btn-light my-1" to="/dashboard">Regresa</Link>
            </form>

        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,

}

export default connect(null,{addEducation})(withRouter(AddEducation))
