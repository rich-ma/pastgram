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
		this.props.closeModal();
		this.setState({loading: true});
		this.props.fetchUserPosts(this.props.userId);
	}

	componentWillReceiveProps(newProps){
		this.setState({
			user: newProps.user,
			posts: newProps.posts,
			loading: false
		});
		this.props.closeModal();
	}



	render(){
		if(this.state.loading || this.state.user === undefined) return null;

		const { posts, user, currentUser, userId } = this.state;

		const toggleFollow = (
			<button>{}</button>
		);

		const editUser = (
			<button onClick={e => this.props.openModal({modal: 'editUser', data: user})} >Edit Profile</button>
		)

		const postsFollow = (
				<ul className='user-data'>
					<li><h3>{posts.length}</h3> posts</li>
					<li><h3>{posts.length}</h3> followers</li>
					<li><h3>{posts.length}</h3> following</li>
				</ul>
		)

		const userInfo = (
			<div className='username-bio-followers'>
				<h3 className='user-realname'>{user.name}</h3>
				<p className='user-bio' >{user.bio}</p>
				<h4 className='followers'>Followed by ...</h4>
			</div>
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
							<div className='username-button'>
								<h3 className='username'>{user.username}</h3>
								{button}
							</div>
							<div className='user-desktop'>
								{postsFollow}
								{userInfo}
							</div>
						</div>
					</div>
					<div className='user-mobile'>
						{userInfo}
						{postsFollow}
					</div>
				</div>
				<ul className='user-posts'>
					{posts.map( post => {
						return (
							<li key={post._id}><img src={post.url} onClick={() => openModal({modal: 'postShow', data: post})} alt='post.text'/></li>
						)
					})}
				</ul>

			</div>

		)
	}

}

export default Profile;

// <img src={`this.state.`}