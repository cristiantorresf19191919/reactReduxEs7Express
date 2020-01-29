import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
             <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">CRISTIAN SCRIPT NETWORK </h1>
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

export default Landing
