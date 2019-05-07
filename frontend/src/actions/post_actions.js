import { getPosts, getUserPosts, createPost, getPost } from '../util/post_api_util';

export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_NEW_POST = 'RECEIVE_NEW_POST'
export const RECEIVE_USER_POSTS = 'RECEIVE_USER_POSTS'

export const receivePost = post => ({
	type: RECEIVE_POST,
	post
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

export const fetchPost = postId => dispatch =>{
	getPost(postId)
		.then(post => receivePost(post))
		.catch(err => console.log(err));
}

export const fetchPosts = () => dispatch =>{
	getPosts()
		.then(posts => receivePosts(posts))
		.catch(err => console.log(err));
}

export const fetchUserPosts = id => dispatch => (
	getUserPosts(id)
	.then(posts => dispatch(receiveUserPosts(posts)))
	.catch(err => console.log(err))
);

export const writePost = data => dispatch => (
	createPost(data)
	.then(post => dispatch(receiveNewPost(post)))
	.catch(err => console.log(err))
);