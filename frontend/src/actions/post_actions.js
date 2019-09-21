import {
	getPosts,
	createPost,
	getPostShow,
	addLike,
	removeLike,
	fetchUserPosts
} from '../util/post_api_util';
import { receiveUsers } from './user_actions';

export const RECEIVE_POST_SHOW = 'RECEIVE_POST_SHOW';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_NEW_POST = 'RECEIVE_NEW_POST';
export const RECEIVE_USER_POSTS = 'RECEIVE_USER_POSTS';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_UPDATE = 'RECEIVE_POST_UPDATE';
export const CLEAR_POST_UPDATE = 'CLEAR_POST_UPDATE'

export const receiveErrors = errors => ({
	type: RECEIVE_POST_ERRORS,
	errors
});

export const receivePostShow = (data) => ({
	type: RECEIVE_POST_SHOW,
	data
})

export const receivePosts = data => ({
	type: RECEIVE_POSTS,
	data
})

export const receiveNewPost = post => ({
	type: RECEIVE_NEW_POST,
	post
})

export const receiveUserPosts = data => ({
	type: RECEIVE_USER_POSTS,
	data
})

export const receivePost = post => ({
	type: RECEIVE_POST,
	post
})

export const receivePostUpdate = post => ({
	type: RECEIVE_POST_UPDATE,
	post
})

export const clearPostUpdate = () => ({
	type: CLEAR_POST_UPDATE
})

export const fetchPostShow = postId => dispatch =>{
	return getPostShow(postId)
		.then(data => {
			dispatch(receivePostShow(data.data))
		})
		.catch(err => dispatch(receiveErrors(err.response.data)));
}


//need to pingpong users object to minimize hitting the db for user objects every time
export const fetchPosts = reqData => dispatch =>{
	return getPosts(reqData)
		.then(response => {
			dispatch(receiveUsers(response.data.users));
			dispatch(receivePosts(response.data.all));
		})
		.catch(err => {
			dispatch(receiveErrors(err.response.data));
		})
}

//get more posts for user profile page.
// data contains (user(boolean), userId, currentpostpage, totalPages)
export const loadUserPosts = reqData => dispatch => {
	if(reqData.loaded){
		return fetchUserPosts(reqData)
			.then(response => dispatch(receiveUserPosts(response.data.profile)))
			.catch(err => dispatch(receiveErrors(err.response.data)))
	} else {
		return fetchUserPosts(reqData)
		.then(response => dispatch(receiveUserPosts(response.data.profile)))
		.catch(err => dispatch(receiveErrors(err.response.data)))
	}
};

export const writePost = data => dispatch =>{
	return createPost(data).then(post => (
		dispatch(receiveNewPost(post))))
		.catch(err => dispatch(receiveErrors(err)))
};

export const likePost = data => dispatch => {
	return addLike(data)
	.then(post => dispatch(receivePostUpdate(post)))
	.catch(err => dispatch(receiveErrors(err.response.data)))
}

export const unlikePost = data => dispatch => {
	return removeLike(data)
	.then(post => dispatch(receivePostUpdate(post)))
	.catch(err => dispatch(receiveErrors(err.response.data)))
}
