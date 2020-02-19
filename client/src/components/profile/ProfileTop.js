import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({user,profile:{company,status,location,website}}) => {

    const {youtube,facebook,twitter,instagram,linkedin} = profile.social;
    return (
        <Fragment>
        <div className="profile-top bg-primary p-2">
            <img src={user.avatar} alt="" className="round-img my-1"/>
            <h1 className="large">{user.name}</h1>
    <p className="lead">{status} {company && (<span> at {company} </span>)}</p>
            <p>{location &&
                <span> {location}</span>
            }</p>
            <div className="icons my-1">
                {website && 
                (<span>
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                    </a>
                </span>)
                }
                
            </div>
        </div>
            
        </Fragment>
        
    )
}

ProfileTop.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.array.isRequired,

}

export default ProfileTop
