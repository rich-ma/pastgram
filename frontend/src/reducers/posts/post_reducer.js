import { RECEIVE_POST_SHOW, RECEIVE_POST, RECEIVE_NEW_POST, RECEIVE_USER_POSTS, RECEIVE_POSTS } from '../../actions/post_actions';

const PostsReducer = (state = {
		all:{}, 
		users:{}, 
		user: undefined, 
		new: undefined, 
		post: undefined,
		posts: {}
	}, 
	action) => {
	Object.freeze(state);

	let newState = Object.assign({}, state);


	switch(action.type){
		case RECEIVE_POSTS:
			newState.all = action.data.posts;
			return newState;
		case RECEIVE_POST_SHOW:
			newState.post = action.data.post;
			newState.user = action.data.user;
			return newState;
		case RECEIVE_USER_POSTS:
			console.log(action.data);
			newState.user = action.data.user;
			newState.posts = action.data.posts;
			return newState;
		case RECEIVE_NEW_POST:
			newState.new = action.post.data;
			return newState;
		case RECEIVE_POST:
			newState.post = action.post.data;
			return newState;
		default:
			return state;
	}
};

export default PostsReducer;