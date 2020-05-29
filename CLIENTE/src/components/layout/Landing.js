import React from 'react'
import {connect} from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {AnimateOnChange} from 'react-animation';

  


const Landing = ({isAuthenticated}) => {

  if (isAuthenticated){
    return <Redirect to='/dashboard'/>
  }
    return (
        <div>
             <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <AnimateOnChange    >
              <h1 className="x-large">CRISTIAN SCRIPT NETWORK </h1>
          </AnimateOnChange>
          <p className="lead">
            Crea tu Portafolio, comparte post y obten ayude de otros programadores           
          </p>
          <div className="buttons">
              <Link to='/Register' className='btn btn-primary' >Registrate</Link>
              <Link to='/Login' className='btn btn-light>'>Login</Link>
          </div>
        </div>
      </div>
    </section>
            
        </div>
    )
}


const mapStateToProps = state =>({
  isAuthenticated : state.auth.isAuthenticated
})

Landing.propType = {
  isAuthenticated : PropTypes.bool.isRequired,
}


export default connect(mapStateToProps)(Landing)
