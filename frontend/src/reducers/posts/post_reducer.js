import { RECEIVE_POST_SHOW, RECEIVE_POST, RECEIVE_NEW_POST, RECEIVE_USER_POSTS, RECEIVE_POSTS } from '../../actions/post_actions';

const PostsReducer = (state = {
		all:{
			currentPage: 0,
			totalPages: undefined,
			posts: [],
			totalPosts: 0
		}, 
		new: undefined, 
		post: undefined,
		profile: {
			currentPage: 0,
			totalPages: undefined,
			totalPosts: 0,
			posts: []
		}
	}, 
	action) => {
	Object.freeze(state);
	let newState = Object.assign({}, state);

	switch(action.type){
		case RECEIVE_POSTS:
			console.log(action);
			newState.all.currentPage = action.data.currentPage;
			newState.all.totalPages = action.data.totalPages; //can drop this concept
			newState.all.posts = action.data.posts; //might want to concat new posts onto old ones, or can do it in the react component
			newState.all.totalPosts = action.data.totalPosts;
			return newState;
		case RECEIVE_POST_SHOW:
			newState.post = action.data.post;
			newState.user = action.data.user;
			return newState;
		case RECEIVE_USER_POSTS:
			newState.profile.posts = action.data.posts;
			newState.profile.currentPage = action.data.currentPage;
			newState.profile.totalPages = action.data.totalPages;
			newState.profile.totalPosts = action.data.totalPosts;
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