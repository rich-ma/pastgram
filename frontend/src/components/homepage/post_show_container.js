import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostShow from './post_show';

//Write comments, add like

const mSTP = (state, ownProps) => {
	console.log(ownProps);
	//check if link is the new post, or write selector for specific post of it isnt
	const post = state.posts.new;
	//check if user is current user, or write selector for that user
	const user = state.session.user;

	return({
		post,
		user
	})
}

//like post, add comment?
const mDTP = dispatch => {

}

export default withRouter(connect(mSTP, mDTP)(PostShow))