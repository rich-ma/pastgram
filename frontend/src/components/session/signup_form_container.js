import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import { Link } from 'react-router-dom';
import SessionForm from './session_form';

const mSTP = (state) => {
	return {
		errors: state.errors.session,
		formType: 'signup',
		navLink: <Link className='session-link' to='api/users/login'>Already have an account?</Link>
	}
}

const mDTP = dispatch => {
	return {
		processForm: user => dispatch(signup(user)),
		demoLogin: user => dispatch(login(user))
	}
}

export default connect(mSTP, mDTP)(SessionForm);