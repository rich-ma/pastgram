import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';
import { writePost } from '../../actions/post_actions';
import { openModal } from '../../actions/modal_actions';

import NavBar from './navbar';

const mSTP = state => {
	return {
	loggedIn: state.session.isAuthenticated,
	currentUser: state.session.user,
	modal: state.modal
	}
}

const mDTP = dispatch => ({
	writePost: (post) => dispatch(writePost(post)),
	openModal: (modal) => dispatch(openModal(modal))
})

export default connect(mSTP, mDTP)(NavBar);
