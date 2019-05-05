import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import Homepage from './homepage';

const mSTP = state => {
	let currentUser = state.session.isAuthenticated ? state.session.user : null;
	console.log(currentUser)
	return{
		currentUser
	}
}

const mDTP = dispatch => ({
	logout: () => dispatch(logout())
})

export default withRouter(connect(mSTP, mDTP)(Homepage));

