import { combineReducers } from 'redux';
import session from './session/session_reducer';
import errors from './errors/errors_reducer';
import posts from './posts/post_reducer';
import modal from './modal/modal_reducer';
import users from './users/users_reducer';

const RootReducer = combineReducers({
	session,
	errors,
	posts,
	modal,
	users
});

export default RootReducer;