import React from 'react';
import { Link } from 'react-router-dom';
import PostShowContainer from '../homepage/post_show_container';

import '../css/post_index.css';

class PostIndex extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentPage: this.props.currentPage,
			totalPages: this.props.totalPages,
			currentUser: this.props.currentUser,
			posts: this.props.posts,
			users: this.props.users,
			loading: true,
			allToggle: false
		}

		this.loadingRef = React.createRef();
		this.loadPosts = this.loadPosts.bind(this);
		this.handleObserver = this.handleObserver.bind(this);
		this.toggleIndex = this.toggleIndex.bind(this);
		this.props.fetchPosts({
			users: {},
			currentPage: 0,
			following: this.state.currentUser.following
		});
	}



	componentDidMount(){
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

	static getDerivedStateFromProps(newProps, state){
			let posts;
			if(newProps.postUpdate){
				posts = state.posts;
				posts[newProps.postUpdate.index - 1] = newProps.postUpdate;
				newProps.clearPostUpdate();
			}
			else if (newProps.currentPage === 1) {
				posts = newProps.posts;
			} else if (newProps.currentPage !== state.currentPage) {
				posts = [...state.posts, ...newProps.posts];
			} else {
				posts = state.posts;
			}
			return({
				currentPage: newProps.currentPage,
				totalPages: newProps.currentPage,
				users: newProps.users,
				posts,
				loading: false
			})
	}

	loadPosts(){
		console.log(this.state);
		this.setState({loading: true});
		const data = {
			users: this.state.users,
			currentPage: this.state.currentPage,
			following: this.state.currentUser.following
		};
		this.state.allToggle ? 
		this.props.fetchAllPosts(data) :
		this.props.fetchPosts(data);
	}

	toggleIndex(e){
		console.log(this.state.allToggle);
		this.setState({
			allToggle: !this.state.allToggle,
			posts: [],
			currentPage: 0
		}, () => this.loadPosts());
	}

	handleObserver(entities, observer){
		const y = entities[0].boundingClientRect.y;
		if(this.state.prevY > y) {
			if(this.state.loading){
				return null;
			} else {
				this.loadPosts();
			}
		}
		this.setState({
			prevY: y
		});
	}

	render(){
		let loading = Object.keys(this.state.users).length === 0 || this.state.posts.length === 0;
		const { posts, currentUser, users } = this.state;

		const desktopProfile = <div className='index-profile'>
				<Link to={`/users/${currentUser.id}`} className='index-profile-img-container'>
					<img src={currentUser.avatarUrl} alt='user-avatar'/>
				</Link>
				<Link to={`/users/${currentUser.id}`} className='index-names' default={false} value={true} >
					<span className='index-username'>{currentUser.username}</span>
					{currentUser.name ? <span className='index-name'>{currentUser.name}</span> : null}
				</Link>
			</div>
			
		return(
			<div className='index-container'>
				<div className='index-left'>
					<ul className='index-ul'>
					{loading ? null : posts.map((post, i) => (<li key={i}><PostShowContainer post={post} isIndex={true} index={i + 1} user={users[post.userId + '']}/></li>))}
					</ul>
					<div className='index-observer' ref={loadingRef => (this.loadingRef = loadingRef)}></div>
				</div>
				<div className='index-right'>
					{desktopProfile}
					<label className="index-switch">
						<h3>All Posts</h3>
						<input type="checkbox" onChange={this.toggleIndex}/>
						<span className="slider round"></span>
					</label>
				</div>
			</div>
		)
	}
}

export default PostIndex;
