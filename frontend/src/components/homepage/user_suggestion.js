import React from 'react';
import { Link } from 'react-router-dom';

class UserSuggestion extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			users: this.props.users,
		}

		this.props.fetchUserSuggestions(this.props.currentUser.following);
	}

	static getDerivedStateFromProps(newProps, state){
		return({
			users: newProps.users,
			currentUser: newProps.currentUser
		})
	}

	render(){
		const { users } = this.state;

		return(
			<div className='suggestion-container'>
				<ul className='suggestion-list'>
					hello
				</ul>
			</div>
		)
	}
}

export default UserSuggestion;

// {users.map(user => (
// 						<li>
// 							<div className='index-profile'>
// 								<Link to={`/users/${user.id}`} className='index-profile-img-container'>
// 									<img src={user.avatarUrl} alt='user-avatar'/>
// 								</Link>
// 								<Link to={`/users/${user.id}`} className='index-names' default={false} value={true} >
// 									<span className='index-username'>{user.username}</span>
// 									{user.name ? <span className='index-name'>{user.name}</span> : null}
// 								</Link>
// 							</div>
// 						</li>
// 					))}