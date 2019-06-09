import * as UserAPIUtil from '../util/user_api_util';
import { receiveUserUpdate } from './session_actions';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const CLEAR_USER_ERRORS = 'CLEAR_USER_ERRORS';

export const receiveUser = user => ({
	type: RECEIVE_USER,
	user
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
		.then(user => dispatch(receiveUser(user)))
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
)