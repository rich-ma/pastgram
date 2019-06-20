import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { likePost, unlikePost } from '../../actions/post_actions';
import PostIndexItem from './post_index_item';

const mSTP = (state, ownProps) => {
	const { post, currentUser } = ownProps;

	return({
		post,
		currentUser
	})

}

const mDTP = dispatch => ({
	likePost: (data) => dispatch(likePost(data)),
	unlikePost: (data) => dispatch(unlikePost(data))
})

export default withRouter(connect(mSTP, mDTP)(PostIndexItem));