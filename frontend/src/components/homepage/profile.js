import React from 'react';
import axios from 'axios';
import '../css/profile.css';


class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentUser: this.props.currentUser,
			user: this.props.user,
			posts: this.props.posts,
			currentPage: this.props.currentPage,
			totalPages: this.props.totalPages,
			totalPosts: this.props.totalPosts,
			userId: this.props.userId,
			loading: true,
		}
		this.element = React.createRef();
		this.loadPosts = this.loadPosts.bind(this);
	}

	componentWillMount(){
		this.props.closeModal();
		this.setState({loading: true});
		this.loadPosts();
	}


	// componentWillReceiveProps(newProps){
	// 	let posts = this.state.posts;
	// 	if(this.state.currentPage !== newProps.currentPage){
	// 		posts = this.state.posts.concat(newProps.posts);
	// 	} 

	// 	this.setState({
	// 		currentPage: newProps.currentPage,
	// 		user: newProps.user,
	// 		posts,
	// 		totalPosts: newProps.totalPosts,
	// 		loading: false
	// 	});
	// 	this.props.closeModal();

	// }

	loadPosts(){ 
		axios.post(`/api/posts/user/${this.state.userId}`, {
			loaded: this.state.user ? true : false,
			userId: this.props.userId,
			currentPage: this.state.currentPage
		}).then(res => {
			let posts = this.state.posts.concat(res.data.profile.posts);
			if(!this.state.user){
				this.setState({
					user: res.data.user,
					currentPage: res.data.profile.currentPage,
					posts,
					totalPosts: res.data.profile.totalPosts,
					totalPages: res.data.profile.totalPages,
					loading: false
				});
			} else {
				this.setState({
					currentPage: res.data.profile.currentPage,
					posts,
					totalPosts: res.data.profile.totalPosts,
					totalPages: res.data.profile.totalPages,
					loading: false
				});
			}
		});
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
										<img className='profile-post-img' src={innerPost.url} onClick={() => openModal({modal: 'postShow', data: innerPost})} alt={innerPost.text}/>
										{ i >= posts.length * 75 ? <span className='sentinel'></span> : null}
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

		const postList = (
			<ul className='test-list'>
				{posts.map((post, i) => {
					return (
						<li key={'post' + i}>
							<img className='profile-post-img' src={post.url} onClick={() => openModal({modal: 'postShow', data: post})} alt={post.text}/>
						</li>
					)
				})}
			</ul>
		)

		const postsFollow = (
				<ul className='user-data'>
					<li><h3>{this.state.totalPosts}</h3> posts</li>
					<li><h3>{this.state.totalPosts}</h3> followers</li>
					<li><h3>{this.state.totalPosts}</h3> following</li>
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
				<button onClick={this.loadPosts}> load posts</button>
				{postList}
				<div className='profile-observer' ref={this.element}></div>
			</div>

		)
	}

}

export default Profile;

// <img src={`this.state.`}