import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { writePost } from '../../actions/post_actions';

import NewPost from './new_post';

const mSTP = state => {
	return({
		currentUser: state.session.user,
		errors: {
			post: state.errors.post
		}
	})
};

const mDTP = dispatch => ({
	writePost: data => dispatch(writePost(data)),
	closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(NewPost);