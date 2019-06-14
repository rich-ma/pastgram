import { RECEIVE_POST_SHOW, RECEIVE_POST, RECEIVE_NEW_POST, RECEIVE_USER_POSTS, RECEIVE_POSTS } from '../../actions/post_actions';

const PostsReducer = (state = {
		all:{}, 
		new: undefined, 
		post: undefined,
		profile: {
			currentPage: 
		}
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
			newState.profile.posts = action.data.posts;
			newState.profile.currentPage = action.data.currentPage;
			newState.profile.totalPages = action.data.totalPages;
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