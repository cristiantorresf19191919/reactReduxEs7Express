import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';
import Typist from 'react-typist';

const Register = ({setAlert, register,isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });    
    const {name, email, password, password2} = formData;     
    const onSubmit = async event =>  {
        event.preventDefault();
        if (password !== password2){
            setAlert('passwords do not match','danger');
        } else {
            register({name, email, password});
            }           
        }
    
    const onChange = event => setFormData({
        ...formData,
        [event.target.name]: event.target.value
    }) 

    if (isAuthenticated){
        return <Redirect to='/Dashboard' />
    }

    return (
        <Fragment>     
                <Typist avgTypingDelay={60} cursor={{show:false}}>
                <h1 className="large text-primary">Registrate</h1>
                <p className="lead"><i className="fas fa-user"></i> Crea tu Cuenta</p>
                    </Typist>       
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" placeholder="Nombre" 
                            name="name" 
                            value={name}
                            onChange={ (e) => onChange(e) }
                             />

                    </div>
                    <div className="form-group">
                        <input 
                            type="email"
                            onChange={ (e) => onChange(e)}  
                            placeholder="Correo electrónico"
                            value = {email}
                            name="email" />
                        <small className="form-text"
                        >Este sitio usa gravatar, si quieres una foto en tu perfil usa gravatar</small>
                        <a target="_blank" href="https://en.gravatar.com/">Crea tu Gravatar aca</a>
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
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirmar contraseña"
                            name="password2"
                            minLength="6"
                            onChange={ (e) => onChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Ya tienes una cuenta? <Link to='/login'>Inicia Sesion</Link>
                </p>            
        </Fragment>
    )}

    const mapStateToProps = state => ({
        isAuthenticated : state.auth.isAuthenticated
    })

Register.propTypes={
    alert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool
};
export default connect(mapStateToProps, {setAlert,register})(Register);
