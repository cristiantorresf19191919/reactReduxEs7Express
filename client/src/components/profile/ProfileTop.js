import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({profile,profile:{company,status,location,website,social,user}}) => {

    const {youtube,facebook,twitter,instagram,linkedin} = social;
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
                {social && social.twitter && (
                    <a href={social.twitter} href="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                )}{social && social.facebook && (
                    <a href={social.facebook} href="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>
                )}{social && social.linkedin && (
                    <a href={social.linkedin} href="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                )}{social && social.youtube && (
                    <a href={social.youtube} href="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>
                )}{social && social.instagram && (
                    <a href={social.instagram} href="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                )}
                
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
