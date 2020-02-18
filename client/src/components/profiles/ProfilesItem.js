import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfilesItem = ({profile}) => {
    const {user,status, company, location, skills,_id} = profile;
    if (user){
        var {name, avatar} = user;
    }
    const idProfile = user._id

    const componente = (
        <div className="profile bg-light">

            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span>at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">Ver Perfil</Link>
            </div>
            <ul>
                { skills && skills.splice(0,4).map((skill,index)=> (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i> {skill}
                    </li>
                ))
                
            }
            </ul>


        </div>)

    const notiene = (
        <div>
            <b>el perfil con id {_id} no tiene usuario <i class="fas fa-sad-tear"></i></b>
        </div>
    )

    return (       
        <Fragment>

            <div>
                {user !== null ? componente : notiene}
            </div>

    

        
</Fragment>
        
    )
}
ProfilesItem.propTypes = {
    profiles: PropTypes.object.isRequired,
}

export default ProfilesItem
