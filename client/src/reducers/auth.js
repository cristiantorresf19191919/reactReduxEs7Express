import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR, USE_LOADED } from "../actions/types";


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated : null,
    loading: true,
    user: null    
}
/* incialmente es el initialstate pero siempre se va ir actualizando automaticamente por eso se pone ...state*/
export default function (state = initialState, action){
    const {type, payload} = action;
    switch(type){
        
        case USE_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token);
            console.log('estoy dentro del auth reducer y quiero sber que carajos es el payload y el state');
            console.log('state');
            console.log(state);
            console.log('payload');
            // console.log({ token: payload.token })
            console.log({...payload});
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading : false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                isAuthenticated: false,
                loading : false
            }
        default:
            return state
    }

}


