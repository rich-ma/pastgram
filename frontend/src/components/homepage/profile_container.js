import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from './profile';

//find user with the id we're going to
const mSTP = (state, ownProps) => {
	// write selector here	
	//posts
	return({
		currentUser: state.session.user,
		user: state.session.user,
	})
}

const mDTP = dispatch => ({
	logout: () => dispatch(logout())
})

// export default withRouter(connect(mSTP, mDTP)(Profile));
export default withRouter(connect(mSTP, mDTP)(Profile));

