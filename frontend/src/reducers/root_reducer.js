import { combineReducers } from 'redux';
import session from './session/session_reducer';
import errors from './errors/errors_reducer';
import posts from './posts/post_reducer';

const RootReducer = combineReducers({
	session,
	errors,
	posts
});

export default RootReducer;