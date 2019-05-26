import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import post from './post_errors_reducer';
import image from './image_errors_reducer';
import user from './users_errors_reducer';

export default combineReducers({
	session,
	post,
	image,
	user
});