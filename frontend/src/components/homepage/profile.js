import React from 'react';
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
			loadingPosts: false,
			prevY: 0,
			toggleFollowMenu : false,
			followLoading: false
		};

		this.loadingRef = React.createRef();
		this.loadPosts = this.loadPosts.bind(this);
		this.handleObserver = this.handleObserver.bind(this);
		this.toggleFollow = this.toggleFollow.bind(this);

		this.props.closeModal();
		this.props.loadUserPosts({
			loaded: false,
			userId: this.props.userId,
			currentPage: 0
		});
	}

	static getDerivedStateFromProps(newProps, state) {
		let posts;
		if(newProps.postUpdate){
			posts = state.posts;
			const updatedPost = newProps.postUpdate;
			posts[updatedPost.index - 1] = updatedPost;
		} else if(newProps.currentPage === 1){
			posts = newProps.posts;
		} else if(newProps.currentPage !== state.currentPage){
			posts = [...state.posts, ...newProps.posts];
		} else {
			posts = state.posts;
		}
		return({
			currentPage: newProps.currentPage,
			totalPages: newProps.totalPages,
			totalPosts: newProps.totalPosts,
			user: newProps.user,
			posts,
			loading: false,
			loadingPosts: false
		})
	}

	loadPosts() {
		this.props.loadUserPosts({
			loaded: this.state.user ? true : false,
			userId: this.props.userId,
			currentPage: this.state.currentPage
		});
	}

	componentDidMount() {
		var options = {
			root: null, 
			rootMargin: '0px',
			threshold: 0
		};

		this.observer = new IntersectionObserver(
			this.handleObserver.bind(this), 
			options
		);
		this.observer.observe(this.loadingRef);
	}

	handleObserver(entities, observer) {
		const y = entities[0].boundingClientRect.y;
		if (this.state.prevY > y) {
			if(this.state.loadingPosts){
				return null;
			} else {
				this.loadPosts();
			}
		}
		this.setState({
			prevY: y
		});
	}

	toggleFollow() {
		const { user, currentUser } = this.state;
		this.setState({ followLoading: true });

		const data = {
			userId: this.state.userId,
			currentUserId: currentUser.id
		};

		if(user.following.includes(currentUser.id)){
			this.props.unfollowUser(data).then(() => {
				this.setState({ followLoading: false });
			});
		} else {
			this.props.followUser(data).then(() => {
				this.setState({ followLoading: false });
		});
	}
}

	//check if user is current user, if not, create following button
	render(){
		const { posts, user, currentUser, userId } = this.state;
		let toggleButton;
		let editUser;

		console.log(user);

		if (user && currentUser.id !== userId) {
			let following = user.following.includes(currentUser.id);

			const unfollowButton = (
			<button className='unfollow-bt' onClick={ this.state.followLoading ? null : this.toggleFollow}>
				Following
				<div>
				</div>
			</button>
		)

		const followButton = (
			<button className='follow-bt' onClick={this.state.followLoading ? null : this.toggleFollow}>
				Follow
			</button>
		)

		toggleButton = following ? unfollowButton : followButton;
		} else { 
			editUser = (
				<button onClick={e => this.props.openModal({modal: 'editUser', data: user})} >Edit Profile</button>
			)
		}

		const button = currentUser.id === userId ? editUser : toggleButton;

		const openModal = this.props.openModal;

		const postGrid = (
		<div className='post-grid-container'>
			{posts.map((post, i) => {
				if(i % 3 === 0){
					let list = posts.slice(i, i + 3);
					return (
						<ul key={i} className='post-grid-ul'>
							{list.map((innerPost, j) => {
								let data = {
									post: innerPost,
									index: j + 1,
									user: {
										id: user._id,
										avatarUrl: user.avatarUrl,
										username: user.username
									}
								}
								return (
									<li key={innerPost._id} >
										<img className='profile-post-img' src={innerPost.url} onClick={() => openModal({modal: 'postShow', data})} alt={innerPost.text}/>
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

		const postsFollow = !this.state.user ? null : (
				<ul className='user-data'>
					<li><h3>{this.state.totalPosts}</h3> posts</li>
					<li><h3>{user.followers.length}</h3> {user.followers.length === 1 ? 'follower' : 'followers'}</li>
					<li><h3>{user.following.length}</h3> following</li>
				</ul>
		)

		const userInfo = !this.state.user ? null : (
			<div className='username-bio-followers'>
				<h3 className='user-realname'>{user.name}</h3>
				<p className='user-bio' >{user.bio}</p>
				<h4 className='followers'>Followed by ...</h4>
			</div>
		)

		return (
			<div className='profile-container'>
				{!this.state.user ? null : 
					<div className='user-info'>
						<div className='user-info-upper'>
							<div className='avatar-box'>
								<img src={user.avatarUrl} className='user-avatar' alt='user-avatar'/>
							</div>
							<div className='user-info-container'>
								<div className='username-button'>
									<h3 className='username'>{user.username}</h3>
									{ button }
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
				}
				{postGrid}
				<div className='profile-observer' ref={loadingRef => (this.loadingRef = loadingRef)}></div>
			</div>
		)
	}
}

export default Profile;
