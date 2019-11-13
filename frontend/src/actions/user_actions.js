import * as UserAPIUtil from '../util/user_api_util';
import { receiveUserUpdate } from './session_actions';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const CLEAR_USER_ERRORS = 'CLEAR_USER_ERRORS';

export const receiveUser = user => ({
	type: RECEIVE_USER,
	user
});

export const receiveUsers = users => ({
	type: RECEIVE_USERS,
	users
});

export const receiveErrors = errors => ({
	type: RECEIVE_USER_ERRORS,
	errors
})

export const clearErrors = () => ({
	type: CLEAR_USER_ERRORS
})


export const getUser = id => dispatch => (
	UserAPIUtil.getUser(id)
		.then(user => dispatch(receiveUser(user.data.user)))
		.catch(err => receiveErrors(err.response.data))
)

export const updateUser = data => dispatch => (
	UserAPIUtil.updateUser(data)
		.then(user => {
			dispatch(receiveUser(user.data));
			dispatch(receiveUserUpdate(user.data));
		})
		.catch(err => dispatch(receiveErrors(err.response.data)))
);

export const clearUserErrors = () => dispatch => (
	dispatch(clearErrors())
);

export const followUser = data => dispatch => (
	UserAPIUtil.followUser(data)
		.then(res => {
			dispatch(receiveUserUpdate(res.data.currentUser));
			dispatch(receiveUser(res.data.followUser));
		})
		.catch(err => dispatch(receiveErrors(err.response.data)))
);

export const unfollowUser = data => dispatch => (
	UserAPIUtil.unfollowUser(data)
		.then(res => {
			dispatch(receiveUserUpdate(res.data.currentUser));
			dispatch(receiveUser(res.data.followUser));
		})
		.catch(err => dispatch(receiveErrors(err.response.data)))
);


