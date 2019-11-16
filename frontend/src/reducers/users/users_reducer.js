import { RECEIVE_USER, RECEIVE_USERS, RECEIVE_SUGGESTIONS } from '../../actions/user_actions';
import { RECEIVE_POST_SHOW } from '../../actions/post_actions';

const UsersReducer = (state = {all: undefined, user: undefined, suggestion: undefined}, action) => {
	Object.freeze(state);

	let newState = Object.assign({}, state);

	switch(action.type){
		case RECEIVE_USER:
			newState.user = action.user;
			return newState;
		case RECEIVE_POST_SHOW:
			newState.user = action.data.user;
			return newState;
		case RECEIVE_USERS:
			newState.all = action.users;
			return newState;
		case RECEIVE_SUGGESTIONS:
			newState.suggestion = action.users;
			return newState;
		default:
			return state;
	}
}

export default UsersReducer;