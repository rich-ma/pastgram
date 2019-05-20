import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { writePost } from '../../actions/post_actions';
import { uploadImage } from '../../util/image_upload_util';

import NewPost from './new_post';

const mSTP = state => {
	return({
		currentUser: state.session.user,
		errors: {
			post: state.errors.post,
			image: state.errors.image
		}
	})
};

const mDTP = dispatch => ({
	writePost: data => dispatch(writePost(data)),
	closeModal: () => dispatch(closeModal()),
	uploadImage: image => dispatch(uploadImage(image))
})

export default connect(mSTP, mDTP)(NewPost);