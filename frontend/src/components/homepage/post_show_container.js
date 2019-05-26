import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPostShow } from '../../util/post_api_util';
import { getUser } from '../../actions/user_actions';
import PostShow from './post_show';

//Write comments, add like

const mSTP = (state, ownProps) => {
	const postId = ownProps.match.params.postId;

	return({
		postId,
		post: null,
		user: null
	})
}

		// user: Object.values(state.users.user)[0],
		// post: Object.values(state.posts.post)[0],

//like post, add comment?
const mDTP = dispatch => ({
	getPostShow: (id) => dispatch(getPostShow(id)),
	getUser: (id) => dispatch(getUser(id))
})

export default withRouter(connect(mSTP, mDTP)(PostShow))