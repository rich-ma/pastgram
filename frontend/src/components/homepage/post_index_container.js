import { connect } from 'react-redux';
import { likePost, unlikePost, fetchPosts } from '../../actions/post_actions';
//add comment, delete comment


import PostIndex from './post_index';

const mSTP = (state, ownProps) => {
	return({
		posts: state.posts.all.posts,
		totalPages: state.posts.all.totalPages,
		currentPage: state.posts.all.currentPage,
		currentUser: state.session.user,
		users: state.users.all
	})
}

const mDTP = dispatch => ({
	fetchPosts: (data) => dispatch(fetchPosts(data)),
	likePost: (data) => dispatch(likePost(data)),
	unlikePost: (data) => dispatch(unlikePost(data))
})

export default connect(mSTP, mDTP)(PostIndex);