import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({setAlert, register}) => {
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
    return (
        <Fragment>            
                <h1 className="large text-primary">Registrate</h1>
                <p className="lead"><i className="fas fa-user"></i> Crea tu Cuenta</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" placeholder="Name" 
                            name="name" 
                            value={name}
                            onChange={ (e) => onChange(e) }
                             />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email"
                            onChange={ (e) => onChange(e)} 
                            placeholder="Email Address"
                            name="email" />
                        <small className="form-text"
                        >Este sitio usa gravatar, si quieres una foto en tu perfil usa gravatar</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            onChange={ (e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                            onChange={ (e) => onChange(e)}
                        />
                    </div>
                    <input type="submit" onChange={ (e) => onChange(e)} className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Ya tienes una cuenta? <Link to='/login'>Inicia Sesion</Link>
                </p>            
        </Fragment>
    )}

Register.propTypes={
    alert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
};
export default connect(null, {setAlert,register})(Register);
