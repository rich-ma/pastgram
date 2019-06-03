import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { updateUser } from '../../actions/user_actions';
import { uploadImage } from '../../util/image_upload_util';
import { withRouter } from 'react-router-dom';
import EditUser from './edit_user';

const mSTP = (state, ownProps) => ({
	user: ownProps.user
})

const mDTP = dispatch => ({
	updateUser: data => dispatch(updateUser(data)),
	logout: () => dispatch(logout()),
	uploadImage: image => dispatch(uploadImage(image))
})

export default withRouter(connect(mSTP, mDTP)(EditUser));