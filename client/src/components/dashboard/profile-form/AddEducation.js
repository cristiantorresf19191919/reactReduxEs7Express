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
                Add Your Education
      </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                addEducation(formData, history)

            }}>
                <div className="form-group">
                    <input
                        type="text"
                        value={school}
                        onChange = {e => onChange(e)}
                        placeholder="* School or Bootcamp"
                        name="school"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value = {degree}
                        onChange = {e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)}  />
                </div>
                <div className="form-group">
                    <p>
                        <b>current is {current ? <b>current verdadero</b> : <b>current es falso</b>   }</b> <br/>
                        <input type="checkbox" name="current" value={current} checked={toDateDisabled} onChange={e => {setFormData({...formData, current: !current}); toggleDate(!toDateDisabled)}} /> Current School or Bootcamp
          </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" value={to} onChange={e => onChange(e)} name="to" disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        onChange={e=>{onChange(e)}}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        <h5>SCHOOL {school} - degree {degree} - fieldof {fieldofstudy} - from {from} - description {description}</h5>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,

}

export default connect(null,{addEducation})(withRouter(AddEducation))
