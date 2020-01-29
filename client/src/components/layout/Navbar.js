import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>

                    <Link to='/'><i className="fas fa-code"></i> CRISTIANSCRIPT</Link>
                </h1>
                
                <ul>

                    <li><a href="profiles.html">Desarrolladores</a></li>

                    <li>
                        <Link to='/Register'>
                            Registro
            </Link>
                    </li>
                    <li>
                        <Link to='/Login'>Login</Link>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default Navbar
