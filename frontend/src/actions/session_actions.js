import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_CURRENT_USER_UPDATE = 'RECEIVE_CURRENT_USER_UPDATE'

export const receiveCurrentUser = user => ({
	type: RECEIVE_CURRENT_USER,
	user
});

export const receiveUserSignIn = (user) => ({
	type: RECEIVE_USER_SIGN_IN,
	user
});

export const receiveErrors = errors => ({
	type: RECEIVE_SESSION_ERRORS,
	errors
});

export const logoutUser = () => ({
	type: RECEIVE_USER_LOGOUT
});

export const receiveUserUpdate = user => ({
	type: RECEIVE_CURRENT_USER_UPDATE,
	user
})

export const logout = () => dispatch => {
	localStorage.removeItem('jwtToken');
	APIUtil.setAuthToken(false);
	dispatch(logoutUser());
};


export const login = user => dispatch => (
	APIUtil.login(user).then(res => {
		const { token } = res.data;
		localStorage.setItem('jwtToken', token);
		APIUtil.setAuthToken(token);
		const decoded = jwt_decode(token);
		dispatch(receiveCurrentUser(decoded));
	}).catch(err => {
		return dispatch(receiveErrors(err.response.data))})
);

export const signup = user => dispatch => {
	return (APIUtil.signup(user).then((data) => {
		console.log('user action', data);
			dispatch(receiveUserSignIn(data.data.user))
	}, err => (
			dispatch(receiveErrors(err.response.data))
		))
	)
};

