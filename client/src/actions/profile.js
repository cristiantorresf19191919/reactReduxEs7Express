import Axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE,ACCOUNT_DELETED } from "./types";

// get current user profile
export const getCurrentProfile = () => async dispatch =>{

    try {
        const res = await Axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

      
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }

}

//create or update profile

export const createProfile = (formData, history, edit = false) => async dispatch => {

    try {        
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await Axios.post('/api/profile',formData,config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit ? 'Perfil Actualizado' : 'Perfil Creado','success'));
        if (!edit){
            history.push('/dashboard');
        }
    } catch (error) {
        const errors = error.response.data.errors;        
        if (errors){
            /* puedo correr funciones de otra accion */
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })        
    }
}


// Add experience

export const addExperience = (formData, history) => async dispatch => {

    try {        
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await Axios.put('/api/profile/experience',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experiencia Agregada' ,'success'));
        history.push('/dashboard');
        
    } catch (error) {
        const errors = error.response.data.errors;        
        if (errors){
            /* puedo correr funciones de otra accion */
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })        
    }
}
// Add Education

export const addEducation = (formData, history) => async dispatch => {

    try {        

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await Axios.put('/api/profile/education',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Educacion Agregada' ,'success'));
        history.push('/dashboard');
        
    } catch (error) {
        const error2 = error.response.data.errors;        
        if (error2){
            /* puedo correr funciones de otra accion */
            error2.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })        
    }
}




export const deleteExperience = id => async dispatch => {
    try {

        const res = await Axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experiencia Eliminada' ,'success'));


        
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })  
        error.forEach(error => dispatch(setAlert(error.msg,'danger')));

        
    } }


export const deleteEducation = id => async dispatch => {
    try {

        const res = await Axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Educacion Eliminada' ,'success'));


        
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })  
        error.forEach(error => dispatch(setAlert(error.msg,'danger')));

        
    }
}

// Delete account & profile

export const deleteAccount = () => async dispatch => {

    if (window.confirm('Are you sure? this can not be undone')){        
    try {
        const res = await Axios.delete(`/api/profile/`);
        dispatch({
            type:CLEAR_PROFILE,
        })
        dispatch({
            type:ACCOUNT_DELETED,
        })
        dispatch(setAlert('Su cuenta ha sido eliminada permanentemente'));

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })  
        error.forEach(error => dispatch(setAlert(error.msg,'danger')));       
    }
    }
}