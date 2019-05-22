import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
import { writePost } from '../../actions/post_actions';
import { uploadImage } from '../../util/image_upload_util';
import { receiveErrors } from '../../actions/image_upload_actions';
import NewPost from './new_post';

const mSTP = state => {
	return({
		currentUser: state.session.user,
		newPost: state.posts.new,
		errors: {
			post: state.errors.post,
			image: state.errors.image
		}
	})
};

const mDTP = dispatch => ({
	writePost: data => dispatch(writePost(data)),
	closeModal: () => dispatch(closeModal()),
	uploadImage: image => uploadImage(image),
	receiveErrors: err => dispatch(receiveErrors(err))
})

export default withRouter(connect(mSTP, mDTP)(NewPost));