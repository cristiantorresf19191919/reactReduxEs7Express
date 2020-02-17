import { 
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};
/* incialmente es el initialstate pero siempre se va ir actualizando automaticamente por eso se pone ...state*/
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      }
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };     
    default:
      return state;
  }
}
