import React from 'react';
import '../css/profile.css';
import { runInNewContext } from 'vm';


class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentUser: this.props.currentUser,
			user: this.props.user,
			posts: this.props.posts,
			currentPage: this.props.currentPage,
			totalPages: this.props.totalPages,
			userId: this.props.userId,
			loading: true,

		}
	}

	componentWillMount(){
		this.props.closeModal();
		this.setState({loading: true});
		this.props.loadUserPosts({
			user: this.state.user ? true : false,
			userId: this.props.userId,
			currentPage: this.state.currentPage
		});
	}

	componentWillReceiveProps(newProps){
		let newPosts = this.state.posts.concat(newProps.posts);
		this.setState({
			currentPage: newProps.currentPage,
			user: newProps.user,
			posts: newProps.posts,
			loading: false
		});
		this.props.closeModal();
	}

	loadPosts(){

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

		const postGrid = (
		<div className='post-grid-container'>
			{posts.map((post, i) => {
				if(i % 3 === 0){
					let list = posts.slice(i, i + 3);
					return (
						<ul key={i} className='post-grid-ul'>
							{list.map((innerPost, j) => {
								return (
									<li key={innerPost._id} >
										<img src={innerPost.url} onClick={() => openModal({modal: 'postShow', data: innerPost})} alt={innerPost.text}/>
									</li>
								)
							})}
						</ul>
						)
				} else {
					return null;
				}
			})}
		</div>
		);

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
				{postGrid}
			</div>

		)
	}

}

export default Profile;

// <img src={`this.state.`}