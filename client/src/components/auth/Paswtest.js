import React, { Fragment, useState } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import { setAlert } from '../../actions/alert';


const Paswtest = ({setAlert}) => {

    const [email,setEmail] = useState('');

    

    const update = async (event) => {       
       
        if (!email){
            return setAlert('primero Escribe el correo por que entonces como','danger');
        }
        const res = await Axios.get(`/api/users/change?email=${email}`);
        if (res){
            return setAlert('contrasena cambiada con exito','success');
        } else {
            return setAlert('no se pudo cambiar','danger');
        }
    }

    return (
        <div>
            <h1 className="large text-primary">correo : {email}</h1>
            <div className="form">
                <div className="form-group">
                    <input type="email" onChange = {(e) => setEmail(e.target.value) }/>
                </div>
                    <button className="btn btn-primary" onClick={e => update(e)}>Cambiar</button>
            </div>
            
        </div>
    )
}

export default connect(null,{setAlert})(Paswtest)
