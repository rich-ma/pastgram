import { RECEIVE_USER } from '../../actions/user_actions';

const UsersReducer = (state = {all: {}, user: undefined}, action) => {
	Object.freeze(state);

	let newState = Object.assign({}, state);

	switch(action.type){
		case RECEIVE_USER:
			newState.user = action.user;
			return newState;
		default:
			return state;
	}
}

export default UsersReducer;