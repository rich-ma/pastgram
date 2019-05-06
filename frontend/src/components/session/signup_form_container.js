import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import { Link } from 'react-router-dom';
import SessionForm from './session_form';
import React from 'react';


const mSTP = (state) => {
	return {
		errors: state.errors.session,
		formType: 'signup',
		navLink: <Link className='session-link' to='/login'>Log in</Link>
	}
}

const mDTP = dispatch => {
	return {
		processForm: user => dispatch(signup(user)),
	}
}

export default connect(mSTP, mDTP)(SessionForm);