import React from 'react';

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

		return(
			<div className='suggestion-container'>
				<h3 className='suggestion-title'>Suggestions For You</h3>
				<ul className='suggestion-list'>
					
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