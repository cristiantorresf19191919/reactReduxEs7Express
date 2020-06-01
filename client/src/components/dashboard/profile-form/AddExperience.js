import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../../actions/profile'
import { withRouter, Link } from 'react-router-dom'


const AddExperience = ({addExperience, history}) => {

    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisable, toggleDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;


    const onChange = e =>{ setFormData({ ...formData, [e.target.name]: e.target.value })};
    return (

        <Fragment>

            <h1 className="large text-primary">
                Agrega una Experiencia
                </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Agregue cualquier desarrollador / programación puestos que ha tenido en el pasado
                </p>
            <small>* = campo requerido</small>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                addExperience(formData, history);
            }}>
                <div className="form-group">
                    <b>{title}</b>
                    <input type="text" placeholder="* Título profesional" name="title" value={title} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
           
                    <input type="text" placeholder="* Empresa" name="company" value={company} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Ubicación" name="location" value={location} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>Fecha inicio</h4>
                    <input value={from} onChange={e => onChange(e)} type="date" name="from" />
                </div>
                <div className="form-group">
                    <p><input 
                            value={current}
                            checked={toDateDisable}
                            onChange={e => { setFormData({ ...formData, current: !current }); toggleDisabled(!toDateDisable) }} 
                            type="checkbox"
                            name="current"/> Trabajo actual</p>
                </div>
                <div className="form-group">
                    <h4>Fecha final </h4>
                    <input value={to} onChange={e => onChange(e)} type="date" name="to" disabled = {toDateDisable ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Descripción del trabajo"
                        value={description}
                        onChange={e => onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Enviar" />
                <Link className="btn btn-light my-1" to="/dashboard">Regresar</Link>
            </form>
       
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,

}

export default connect(null, { addExperience })(withRouter(AddExperience))
