import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { Link } from 'react-router-dom';
import SessionForm from './session_form';
import React from 'react';

const mSTP = (state) => {
	return {
		errors: state.errors.session,
		formType: 'login',
		navLink: <Link className='session-link' to='/signup'>Sign up</Link>
	}
}

const mDTP = dispatch => {
	return {
		processForm: user => dispatch(login(user)),
		// demoLogin: user => dispatch(login(user))
	}
}

export default connect(mSTP, mDTP)(SessionForm);