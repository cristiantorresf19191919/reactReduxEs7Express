import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR, USER_LOADED, LOGIN_FAILED,LOGIN_SUCCESS } from "../actions/types";


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
        
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }
            
            case LOGIN_FAILED:
                localStorage.clear();
                return{
                    ...state,
                    isAuthenticated:false,
                    loading:false
                }
            case LOGIN_SUCCESS:
            case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading : false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAILED:
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


