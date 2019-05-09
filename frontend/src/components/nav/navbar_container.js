import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';
import { writePost } from '../../actions/post_actions';

import NavBar from './navbar';

const mSTP = state => {
	return {
	loggedIn: state.session.isAuthenticated,
	currentUser: state.session.user
	}
}

const mDTP = dispatch => ({
	writePost: (post) => dispatch(writePost(post))
})

export default connect(mSTP, mDTP)(NavBar);
