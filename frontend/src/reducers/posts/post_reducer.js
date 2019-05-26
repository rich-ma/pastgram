import { RECEIVE_POST_SHOW, RECEIVE_NEW_POST, RECEIVE_USER_POSTS, RECEIVE_POSTS } from '../../actions/post_actions';

const PostsReducer = (state = {
		all:{}, 
		users:{}, 
		user: undefined, 
		new: undefined, 
		post: undefined
	}, 
	action) => {
	Object.freeze(state);

	let newState = Object.assign({}, state);

	console.log('in post reducer', action);

	switch(action.type){
		case RECEIVE_POSTS:
			newState.all = action.posts.data;
			return newState;
		case RECEIVE_POST_SHOW:
			console.log('in post reducer case', action);
			newState.post = action.data.post;
			newState.user = action.data.user;
			return newState;
		case RECEIVE_USER_POSTS:
			newState.user = action.posts.data;
			return newState;
		case RECEIVE_NEW_POST:
			newState.new = action.post.data;
			return newState;
		default:
			return state;
	}
};

export default PostsReducer;