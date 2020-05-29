import Axios from 'axios';
import { GET_POSTS, POST_ERROR } from './types';

// Get Post

export const getPosts = () => async (dispatch) => {
	try {
		const res = await Axios.get('/api/posts');
		dispatch({
			type: GET_POSTS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};
