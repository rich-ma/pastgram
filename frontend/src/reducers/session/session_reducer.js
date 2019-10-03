import { 
	RECEIVE_USER_LOGOUT, 
	RECEIVE_CURRENT_USER, 
	RECEIVE_USER_SIGN_IN, 
	RECEIVE_CURRENT_USER_UPDATE} 
	from '../../actions/session_actions';

const initialState = {
	isAuthenticated: false,
	user: {}
}

const SessionReducer = (state = initialState, action) => {
	Object.freeze(state);

	let newState = Object.assign({}, state);

	switch(action.type){
		case RECEIVE_USER_LOGOUT:
			return { 
				isAuthenticated: false,
				user: undefined
			};
		case RECEIVE_CURRENT_USER:
			return {
				isAuthenticated: true,
				user: action.user
			}
		case RECEIVE_USER_SIGN_IN:
			console.log('action', action);
			return {
				...state, 
				isSignedIn: true,
				isAuthenticated: true,
				user: action.user
			}
		case RECEIVE_CURRENT_USER_UPDATE:
			newState.user.name = action.user.name;
			newState.user.bio = action.user.bio;
			newState.user.username = action.user.username;
			newState.user.avatarUrl = action.user.avatarUrl;
			return newState;
		default:
			return state;
	}
}

export default SessionReducer;