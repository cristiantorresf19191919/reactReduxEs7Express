import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import {deleteEducation} from '../../actions/profile'

const Education = ({education,deleteEducation}) => {

    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldofstudy}</td>
            <td> <Moment format="YYY/MM/DD">{edu.from}</Moment> - {
                edu.to === null ? ('Now') : (<Moment format="YYY/MM/DD">{edu.to}</Moment>)
            }</td>
            <td>{edu.current}</td>
            <td>{edu.description}</td>
        <td> <button className="btn btn-danger" onClick={e => deleteEducation(edu._id)}>Delete</button></td>
        </tr>
    ))

    const noEducation = (
        <tr>
            <td>
                No hay educacion agregada en el momento
            </td>
        </tr>
    )


    /*  const educations = (<h1>Education cuerpo</h1>) */
    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th>Field of Study</th>
                    <th>Fecha</th>
                    <th>Current</th>
                    <th>Description</th>
                    <td></td>
                </tr>
                    
                </thead>
                
                <tbody>
                    {education.length > 0 ? educations : noEducation}

                </tbody>
            </table>


        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
 
}

export default connect(null, {deleteEducation})(Education)
