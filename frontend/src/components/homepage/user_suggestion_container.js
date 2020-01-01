import { connect } from 'react-redux';
import UserSuggestion from './user_suggestion';
import { fetchUserSuggestions } from '../../actions/user_actions';
const mSTP = state => {
	const users = state.users.suggestion;
	const currentUser = state.session.user;
	return({
		users,
		currentUser
	})
}

const mDTP = dispatch => ({
	fetchUserSuggestions: (data) => dispatch(fetchUserSuggestions(data))
})

export default connect(mSTP, mDTP)(UserSuggestion);