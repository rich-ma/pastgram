import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { Link } from 'react-router-dom';
import SessionForm from './session_form';

const mSTP = (state) => {
	return {
		errors: state.errors.session,
		formType: 'login',
		navLink: <Link className='session-link' to='api/users/register'>Register</Link>
	}
}

const mDTP = dispatch => {
	return {
		processForm: user => dispatch(login(user)),
		demoLogin: user => dispatch(login(user))
	}
}

export default connect(mSTP, mDTP)(SessionForm);