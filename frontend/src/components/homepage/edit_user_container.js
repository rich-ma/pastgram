import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import { updateUser } from '../../actions/user_actions';
import { uploadImage } from '../../util/image_upload_util';
import { withRouter } from 'react-router-dom';
import EditUser from './edit_user';

const mSTP = (state, ownProps) => {
	return({
		user: ownProps.user,
		errors: {
			user: state.errors.user,
			image: state.errors.image,
		}
	});
}

const mDTP = dispatch => ({
	updateUser: data => dispatch(updateUser(data)),
	logout: () => dispatch(logout()),
	uploadImage: image => dispatch(uploadImage(image)),
	closeModal: () => dispatch(closeModal())
})

export default withRouter(connect(mSTP, mDTP)(EditUser));