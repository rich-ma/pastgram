import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPostShow, likePost, unlikePost } from '../../actions/post_actions';
import { closeModal } from '../../actions/modal_actions';
import PostShow from './post_show';

//Write comments, add like

const mSTP = (state, ownProps) => {
	const postId = ownProps.post ? ownProps.post._id : ownProps.match.params.postId;
	const post = ownProps.post ? ownProps.post : state.posts.post;
	const user = ownProps.user ? ownProps.user : state.users.user;
	const isPostShow = ownProps.post ? false : true;
	const isIndex = ownProps.isIndex ? true : false;
	const index = ownProps.index ? ownProps.index : undefined;
	const postUpdate = state.posts.postUpdate ? state.posts.postUpdate : undefined;

	return({
		postId,
		currentUserId: state.session.user.id,
		post,
		user,
		isPostShow,
		isIndex,
		index,
		postUpdate
	})
}

		// user: Object.values(state.users.user)[0],
		// post: Object.values(state.posts.post)[0],

//like post, add comment?
const mDTP = dispatch => ({
	closeModal: () => dispatch(closeModal()),
	fetchPostShow: (id) => dispatch(fetchPostShow(id)),
	likePost: (data) => dispatch(likePost(data)),
	unlikePost: (data) => dispatch(unlikePost(data))
})

export default withRouter(connect(mSTP, mDTP)(PostShow))