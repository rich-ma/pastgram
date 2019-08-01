import { RECEIVE_POST_SHOW, RECEIVE_POST, RECEIVE_NEW_POST, RECEIVE_USER_POSTS, RECEIVE_POSTS, RECEIVE_POST_UPDATE } from '../../actions/post_actions';
const _nullAll = {
	currentPage: 0,
	totalPages: undefined,
	posts: [],
	totalPosts: 0
};

const _nullProfile = {
	currentPage: 0,
	totalPages: undefined,
	totalPosts: 0,
	posts: []
};

const PostsReducer = (state = {
		all: _nullAll,
		new: undefined, 
		post: undefined,
		profile: _nullProfile,
		postUpdate: undefined
	}, 
	action) => {
	Object.freeze(state);
	let newState = Object.assign({}, state);

	switch(action.type){
		case RECEIVE_POSTS:
			newState.post = undefined;
			newState.profile = _nullProfile;
			newState.all.currentPage = action.data.currentPage;
			newState.all.totalPages = action.data.totalPages; //can drop this concept
			newState.all.posts = action.data.posts; //might want to concat new posts onto old ones, or can do it in the react component
			newState.all.totalPosts = action.data.totalPosts;
			return newState;
		case RECEIVE_POST_SHOW:
			newState.all = _nullAll;
			newState.profile = _nullProfile;
			newState.post = action.data.post;
			newState.user = action.data.user;
			return newState;
		case RECEIVE_USER_POSTS:
			newState.post = undefined;
			newState.all = _nullAll;
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
		case RECEIVE_POST_UPDATE:
			newState.postUpdate = action.post.data;
			return newState;
		//clear post update
		default:
			return state;
	}
};

export default PostsReducer;