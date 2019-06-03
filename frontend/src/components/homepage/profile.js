import React from 'react';
import '../css/profile.css';


class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentUser: this.props.currentUser,
			user: this.props.user,
			posts: this.props.posts,
			userId: this.props.userId,
			loading: true
		}
	}

	componentWillMount(){
		this.setState({loading: true});
		console.log(this.props.userId);
		this.props.fetchUserPosts(this.props.userId);
	}

	componentWillReceiveProps(newProps){
		this.setState({
			user: newProps.user,
			posts: newProps.posts,
			loading: false
		})
	}



	render(){
		if(this.state.loading) return null;

		const { posts, user, currentUser, userId } = this.state;

		const toggleFollow = (
			<button>{}</button>
		);

		const editUser = (
			<button onClick={e => this.props.openModal({modal: 'editUser', data: currentUser})} >Edit Profile</button>
		)

		const button = currentUser.id === userId ? editUser : toggleFollow;

		const openModal = this.props.openModal;
		// const button = //button that changes, if profile is current users, edit account, otherwise, follow/unfollow
		return (
			<div className='profile-container'>
				<div className='user-info'>
					<div className='user-info-upper'>
						<div className='avatar-box'>
							<img src={user.avatarUrl} className='user-avatar' alt='user-avatar'/>
						</div>
						<div className='user-info-container'>
							<div className='user-mobile'>
								<h3 className='username'>{user.username}</h3>
								{button}
							</div>
							<div className='user-desktop'>
								<ul className='user-data'>
									<li>posts desktop</li>
									<li>followers</li>
									<li>following</li>
								</ul>
								<h3>Users real name</h3>
								<h4>Followed by ...</h4>
							</div>
						</div>
					</div>
					<div className='user-mobile'>
						<h3 className='user-realname'>{user.name}</h3>
						<h4 className='mobile-followers'>Followed by ...</h4>
						<ul className='user-data'>
							<li>posts</li>
							<li>followers</li>
							<li>following</li>
						</ul>
					</div>
				</div>
				<ul className='user-posts'>
					{posts.map( post => {
						return (
							<li key={post.id}><img src={post.url} onClick={() => openModal({modal: 'postShow', data: post})} alt='post.text'/></li>
						)
					})}
				</ul>

			</div>

		)
	}

}

export default Profile;

// <img src={`this.state.`}