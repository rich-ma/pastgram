import {
	RECEIVE_UPLOAD_ERRORS
} from '../../actions/image_upload_actions';
import { RECEIVE_NEW_POST } from '../../actions/post_actions';

const _nullErrors = {};

const ImageErrorsReducer = (state = _nullErrors, action) => {
	Object.freeze(state);

	switch(action.type){
		case RECEIVE_UPLOAD_ERRORS:
			return action.errors;
		case RECEIVE_NEW_POST:
			return _nullErrors;
		default:
			return state;
	}
};

export default ImageErrorsReducer;
