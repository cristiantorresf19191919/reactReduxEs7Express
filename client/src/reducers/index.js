import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

/* Apenas incluyo los reducers aca se cargan los estados de la variable initialstate */
export default combineReducers({alert,auth,profile,post})