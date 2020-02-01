import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';

/* Apenas incluyo los reducers aca se cargan los estados de la variable initialstate */
export default combineReducers({alert,auth,profile})