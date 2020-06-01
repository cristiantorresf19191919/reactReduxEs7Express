import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR,USER_LOADED,LOGIN_FAILED,LOGIN_SUCCESS, LOG_OUT, CLEAR_PROFILE } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utilities/setAuthToken';

// LOAD USER
export const loadUser = () => async dispatch => {
    if (localStorage.token){
    /* Interceptores */ 
     setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        // load to state user if there is a valid token
        dispatch({
            type: USER_LOADED,
            payload:res.data
        })
        
    } catch (error) {
        dispatch({
        type: AUTH_ERROR
        });        
    }

}
/* export const load */
// register user
export const register = ({name,email,password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }
    const body = JSON.stringify({name,email,password});
    console.log('el body es');
    console.log(body);
    try {
        const res = await axios.post('/api/users',body,config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());      

    } catch (error) {
        const errors = error.response.data.errors;
        
        if (errors){
            /* puedo correr funciones de otra accion */
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:REGISTER_FAIL
        })
    }
}
// lOGIN USER
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }
    const body = JSON.stringify({email,password});
    try {
        const res = await axios.post('/api/auth',body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });   
        dispatch(loadUser());      
    } catch (err) {
        const errors = err.response.data;   
           
        dispatch(setAlert("error de autenticacion",'danger'));      
        
        dispatch({
            type:LOGIN_FAILED
        })
    }
}


// logout clear the profile
export const logOut = () => dispatch => {
    dispatch({
        type:CLEAR_PROFILE
        });
        dispatch({
            type:LOG_OUT
        });
}
    
