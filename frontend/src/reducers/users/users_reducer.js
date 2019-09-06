import { RECEIVE_USER, RECEIVE_USERS } from '../../actions/user_actions';
import { RECEIVE_POST_SHOW } from '../../actions/post_actions';

const UsersReducer = (state = {all: undefined, user: undefined}, action) => {
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
		default:
			return state;
	}
}

export default UsersReducer;