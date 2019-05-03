import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_USER_SIGN_IN = 'RECEIVE_USER_SIGN_IN';

export const logoutUser = () => ({
	type: RECEIVE_USER_LOGOUT
});

export const receiveUserSignIn = () => ({
	type: RECEIVE_USER_SIGN_IN
})

export const receiveCurrentUser = user => {
	type: RECEIVE_CURRENT_USER,
	user
}

export const receiveErrors = errors => {
	type: RECEIVE_SESSION_ERRORS,
	errors
}

export const logout = () => dispatch => {
	//remove token from local storage
	localStorage.removeItem('jwtToken');

	//remove token from AXIOS header
	APIUtil.setAuthToken(false);

	//dispatch logout action to to the reducers
	dispatch(logoutUser());
}

export const login = user => dispatch => {
	APIUtil.login(user).then(res => {
		const { token } = res.data;
		localStorage.setItem('jwtToken', token);
		APIUtil.setAuthToken(token);
		const decoded = jwt_decode(token);
		dispatch(receiveCurrentUser(decoded));
	})
	.catch(err => dispatch(receiveErrors(err.response.data)));
}

export const signup = user => dispatch => (
		APIUtil.signup(user).then(() => (
			dispatch(receiveUserSignIn())
		), err => (
			dispatch(receiveErrors(err.response.data))
		))
);

