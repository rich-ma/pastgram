import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { loadUserPosts, clearPostUpdate } from '../../actions/post_actions';
import { followUser, unfollowUser } from '../../actions/user_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from './profile';

//find user with the id we're going to
const mSTP = (state, ownProps) => {
	const userId = ownProps.match.params.userId;

	//grab updated post for likes and comments
	return({
		userId,
		currentUser: state.session.user,
		user: state.users.user,
		posts: state.posts.profile.posts,
		currentPage: state.posts.profile.currentPage,
		totalPages: state.posts.profile.totalPages,
		totalPosts: state.posts.profile.totalPosts,
		postUpdate: state.posts.postUpdate
	})
}

const mDTP = dispatch => ({
	logout: () => dispatch(logout()),
	loadUserPosts: (data) => dispatch(loadUserPosts(data)),
	openModal: (modal) => dispatch(openModal(modal)),
	closeModal: () => dispatch(closeModal()),
	clearPostUpdate: () => dispatch(clearPostUpdate()),
	followUser: (data) => dispatch(followUser(data)),
	unfollowUser: (data) => dispatch(unfollowUser(data))
})

// export default withRouter(connect(mSTP, mDTP)(Profile));
export default withRouter(connect(mSTP, mDTP)(Profile));

