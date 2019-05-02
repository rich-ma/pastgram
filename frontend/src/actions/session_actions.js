import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';

export const logoutUser = () => ({
	type: RECEIVE_USER_LOGOUT
});

export const logout = () => dispatch => {
	//remove token from local storage
	localStorage.removeItem('jwtToken');

	//remove token from AXIOS header
	APIUtil.setAuthToken(false);

	//dispatch logout action to to the reducers
	dispatch(logoutUser());
}

