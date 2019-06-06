import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchUserPosts } from '../../actions/post_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from './profile';

//find user with the id we're going to
const mSTP = (state, ownProps) => {
	const userId = ownProps.match.params.userId;
	return({
		userId,
		currentUser: state.session.user,
		user: state.posts.user,
		posts: state.posts.posts
	})
}

const mDTP = dispatch => ({
	logout: () => dispatch(logout()),
	fetchUserPosts: (data) => dispatch(fetchUserPosts(data)),
	openModal: (modal) => dispatch(openModal(modal)),
	closeModal: () => dispatch(closeModal())
})

// export default withRouter(connect(mSTP, mDTP)(Profile));
export default withRouter(connect(mSTP, mDTP)(Profile));

