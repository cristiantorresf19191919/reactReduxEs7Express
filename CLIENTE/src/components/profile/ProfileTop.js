import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({ profile, profile: { company, status, location, website, social, user } }) => {

    const { youtube, facebook, twitter, instagram, linkedin } = social || 'data';
    return (
        <Fragment>
            {user ? (
                <div className="profile-top bg-primary p-2">
                    <img src={user.avatar} className="round-img my-1" alt=""/>
                    <h1 className="large">{user.name}</h1>
                    <p className="lead">at {company && (
                        <span>{company}</span>
                    )}</p>
                    <p>{location}</p>
                    <div className="icons my-1">
                        {website && (
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                <i className="fas fa-globe fa-2x"></i>
                            </a>
                        )}

                        {social && twitter && (
                            <a href={twitter} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter fa-2x"></i>
                            </a>
                        )}

                        {social && social.facebook && (
                            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook fa-2x"></i>
                            </a>
                        )}

                        {social && social.linkedin && (
                            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin fa-2x"></i>
                            </a>
                        )}

                        {social && social.youtube && (
                            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-youtube fa-2x"></i>
                            </a>
                        )}
                        {social && social.instagram && (
                            <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram fa-2x"></i>
                            </a>
                        )}




                    </div>
                </div>
            ) : (
                <div>
                    <h1>usuario no existe</h1>
                </div>
            )}
           

        </Fragment>

    )
}

ProfileTop.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.array.isRequired,

}

export default ProfileTop
