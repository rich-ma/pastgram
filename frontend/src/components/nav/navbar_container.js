import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

import NavBar from './navbar';

const mSTP = state => {
	console.log(state.session.user);
	return {
	loggedIn: state.session.isAuthenticated,
	currentUser: state.session.user
}
}

export default connect(mSTP, {logout})(NavBar);
