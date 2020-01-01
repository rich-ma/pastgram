import React from 'react';
import { profile } from '../../util/post_util';

class UserSuggestion extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			users: this.props.users,
			currentUser: this.props.currentUser,
		}

		this.props.fetchUserSuggestions(this.props.currentUser.following);
	}

	static getDerivedStateFromProps(newProps, state){
		console.log('newprops', newProps);
		return({
			users: newProps.users,
			currentUser: newProps.currentUser,
		})
	}

	render(){
		if(this.props.users === undefined) return null;
		let users = this.state.users;

		return(
			<div className='suggestion-container'>
				<h3 className='suggestion-title'>Suggestions For You</h3>
				<ul className='suggestion-list'>
					{ Object.keys(users).map(id => {
						const user = users[id];
						const profileContainer = profile(user);
						return <li>{profileContainer}</li>

					})}
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