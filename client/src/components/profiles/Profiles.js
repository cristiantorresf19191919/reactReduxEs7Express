import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getProfiles} from '../../actions/profile';
import LoadProfilesAnimation from '../profile/loadProfilesAnimation';

        
const Profiles = ({getProfiles, profile:{ profiles, loading}}) => {     

    useEffect(()=>{
        getProfiles();
    },[getProfiles]);    
    return (
    <Fragment>  
        { loading ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Desarrolladores</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i>
                Navega para conectarte con desarrolladores
            </p>
            <div className="profiles">
           {/*      {profiles.length > 0 ? (                    
                    profiles.map(prof => (<ProfilesItem  key="prof._id" profile={prof} />))

                ) : (<h4>No hay perfiles :( .....</h4>)} */}

                    {/* cargando los perfiles con animacion */}
                {
                   profiles && profiles.length > 0 ? (
                        <LoadProfilesAnimation profiles={profiles}  />
                        
                    ) : (
                        <>
                        <h4>no hay profiles en el momento</h4>
                        </>
                    )

                }
            </div>
            </Fragment>}

    </Fragment>    
        )
}
Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => (
    {
        profile: state.profile
    }
)

export default connect(mapStateToProps,{getProfiles})(Profiles)
