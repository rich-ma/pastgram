import { connect } from 'react-redux';
import { likePost, unlikePost, fetchPosts, clearPostUpdate } from '../../actions/post_actions';
//add comment, delete comment


import PostIndex from './post_index';

const mSTP = (state, ownProps) => {
	let users = state.users.all ? state.users.all : {};
	return({
		posts: state.posts.all.posts,
		postUpdate: state.posts.postUpdate,
		totalPages: state.posts.all.totalPages,
		currentPage: state.posts.all.currentPage,
		currentUser: state.session.user,
		users
	})
}

const mDTP = dispatch => ({
	fetchPosts: (data) => dispatch(fetchPosts(data)),
	likePost: (data) => dispatch(likePost(data)),
	unlikePost: (data) => dispatch(unlikePost(data)),
	clearPostUpdate: () => dispatch(clearPostUpdate())
})

export default connect(mSTP, mDTP)(PostIndex);