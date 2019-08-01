import React from 'react';
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
			loading: true
		}

		this.loadingRef = React.createRef();
		this.loadPosts = this.loadPosts.bind(this);
		this.handleObserver = this.handleObserver.bind(this);
		this.props.fetchPosts({
			users: {},
			currentPage: 0
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
			if (newProps.currentPage === 1) {
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
		this.setState({loading: true});
		this.props.fetchPosts({
			users: this.state.users,
			currentPage: this.state.currentPage,
		})
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
			
		return(
			<div className='index-container'>
				<ul className='index-ul'>
							{loading ? null : posts.map((post, i) => (<li key={i}><PostShowContainer post={post} isIndex={true} user={users[post.userId + '']}/></li>))}
				</ul>
				<div className='index-observer' ref={loadingRef => (this.loadingRef = loadingRef)}></div>
			</div>
		)
	}

}

export default PostIndex;
