import { combineReducers } from 'redux';

import SessionErrorsReducer from '../session/session_reducer';

export default combineReducers({
	session: SessionErrorsReducer
});