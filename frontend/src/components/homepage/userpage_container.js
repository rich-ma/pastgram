import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Userpage from './userpage';


const mSTP = state => ({
	currentUser: state.session.user,

})

const mDTP = dispatch => ({
	logout: () => dispatch(logout()),

})

export default withRouter(connect(mSTP, mDTP)(Userpage));
