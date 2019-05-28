import {
	getPosts,
	getUserPosts,
	createPost,
	getPostShow
} from '../util/post_api_util';

export const RECEIVE_POST_SHOW = 'RECEIVE_POST_SHOW'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_NEW_POST = 'RECEIVE_NEW_POST'
export const RECEIVE_USER_POSTS = 'RECEIVE_USER_POSTS'
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS'

export const receiveErrors = errors => ({
	type: RECEIVE_POST_ERRORS,
	errors
});


export const receivePostShow = (data) => ({
	type: RECEIVE_POST_SHOW,
	data
})

export const receivePosts = posts => ({
	type: RECEIVE_POSTS,
	posts
})

export const receiveNewPost = post => ({
	type: RECEIVE_NEW_POST,
	post
})

export const receiveUserPosts = posts => ({
	type: RECEIVE_USER_POSTS,
	posts
})

export const fetchPostShow = postId => dispatch =>{
	return getPostShow(postId)
		.then(data => {
			dispatch(receivePostShow(data.data))
		})
		.catch(err => dispatch(receiveErrors(err.response.data)));
}

export const fetchPosts = () => dispatch =>(
	getPosts()
		.then(posts => receivePosts(posts))
		.catch(err => dispatch(receiveErrors(err.response.data)))
)

export const fetchUserPosts = id => dispatch => (
	getUserPosts(id)
	.then(posts => dispatch(receiveUserPosts(posts)))
	.catch(err => dispatch(receiveErrors(err.response.data)))
);

export const writePost = data => dispatch =>{
	return createPost(data).then(post => (
		dispatch(receiveNewPost(post))))
		.catch(err => dispatch(receiveErrors(err)))
	};