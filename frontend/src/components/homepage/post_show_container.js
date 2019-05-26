import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPostShow } from '../../actions/post_actions';
import PostShow from './post_show';

//Write comments, add like

const mSTP = (state, ownProps) => {
	const postId = ownProps.match.params.postId;

	return({
		postId,
		post: state.posts.post,
		user: state.posts.user
	})
}

		// user: Object.values(state.users.user)[0],
		// post: Object.values(state.posts.post)[0],

//like post, add comment?
const mDTP = dispatch => ({
	fetchPostShow: (id) => dispatch(fetchPostShow(id))
})

export default withRouter(connect(mSTP, mDTP)(PostShow))