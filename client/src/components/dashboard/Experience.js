import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import {deleteExperience} from '../../actions/profile'


const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format="YYY/MM/DD">{exp.from}</Moment> - {
                    exp.to === null ? ('Now') : (<Moment format="YYY/MM/DD">{exp.to}</Moment>)
                }
            </td>
            <td>
                <button className="btn btn-danger" onClick={e => deleteExperience(exp._id)}>Eliminar</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className="my-2">Experiencia Laboral</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company th </th>
                        <th className="hide-sm">Title th</th>
                        <th >Years th</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,

}


export default connect(null, {deleteExperience})(Experience);
