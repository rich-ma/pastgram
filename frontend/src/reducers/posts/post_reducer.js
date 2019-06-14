import { RECEIVE_POST_SHOW, RECEIVE_POST, RECEIVE_NEW_POST, RECEIVE_USER_POSTS, RECEIVE_POSTS } from '../../actions/post_actions';

const PostsReducer = (state = {
		all:{
			currentPage: 0,
			totalPages: undefined,
			posts: {}
		}, 
		new: undefined, 
		post: undefined,
		profile: {
			currentPage: 0,
			totalPages: undefined
		}
	}, 
	action) => {
	Object.freeze(state);
	let newState = Object.assign({}, state);

	switch(action.type){
		case RECEIVE_POSTS:
			newState.all.currentPage = action.data.profile.currentPage;
			newState.all.totalPages = action.data.profile.totalPages; //can drop this concept
			newState.all.posts = action.data.profile.posts; //might want to concat new posts onto old ones, or can do it in the react component
			return newState;
		case RECEIVE_POST_SHOW:
			newState.post = action.data.post;
			newState.user = action.data.user;
			return newState;
		case RECEIVE_USER_POSTS:
			console.log(action.data);
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