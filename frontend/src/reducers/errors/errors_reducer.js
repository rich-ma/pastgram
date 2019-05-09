import { combineReducers } from 'redux';

import session from '../errors/session_errors_reducer';
import post from '../errors/post_errors_reducer';

export default combineReducers({
	session,
	post
});