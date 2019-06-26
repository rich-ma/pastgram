import { RECEIVE_USER, RECEIVE_USERS } from '../../actions/user_actions';

const UsersReducer = (state = {all: {}, user: undefined}, action) => {
	Object.freeze(state);

	let newState = Object.assign({}, state);

	switch(action.type){
		case RECEIVE_USER:
			newState.user = action.user;
			return newState;
		case RECEIVE_USERS:
			newState.all = action.data.users;
			return newState;
		default:
			return state;
	}
}

export default UsersReducer;