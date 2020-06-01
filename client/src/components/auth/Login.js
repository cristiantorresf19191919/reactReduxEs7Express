import React, { Fragment, useState } from 'react';

import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../actions/auth';
import PropTypes from 'prop-types';


const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''      
    });    
    const {email, password} = formData;     
    const onSubmit = async event =>  {
        event.preventDefault();    
            console.log(formData);
            login(email,password);
            try {
              /*   const config = {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
                const body = JSON.stringify(newUser);
                const res = await axios.post('/api/users',body,config); */
              
            } catch (error) {
                console.error(error.msg);
            }
    }
    const onChange = event => setFormData({
        ...formData,
        [event.target.name]: event.target.value
    }) 

    // redirect if logged in

    if(isAuthenticated){
        return <Redirect to='/Dashboard' /> 
    }
    return (
        <Fragment>            
                <h1 className="large text-primary">Inicia Sesion </h1>
                {/* <h1>email : {email} password : {password}</h1> */}
                <p className="lead"><i className="fas fa-user"></i> Entra a tu cuenta</p>
                <form className="form" onSubmit={e => onSubmit(e)}>                  
                    <div className="form-group">
                        <input type="email" onChange={ (e) => onChange(e)} placeholder="Correo electrónico" name="email" />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            minLength="6"
                            onChange={ (e) => onChange(e)}
                        />
                    </div>                
                    <input type="submit" onChange={ (e) => onChange(e)} className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    No tienes una Cuenta? <Link to='/Register'>Registrate</Link>
                </p>            
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

Login.propTypes = {
    login: PropTypes.func,
    isAuthenticated : PropTypes.bool,
}
export default connect(mapStateToProps,{login}) (Login);
