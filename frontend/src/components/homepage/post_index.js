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



		this.props.fetchPosts({
			users: {},
			currentPage: 0
		});
	}

	static getDerivedStateFromProps(newProps, state){
		// console.log('get derived state')
		// if(newProps.currentPage !== state.currentPage){
			let posts = state.posts.concat(newProps.posts);
			return({
				currentPage: newProps.currentPage,
				totalPages: newProps.currentPage,
				users: newProps.users,
				posts,
				loading: false
			})
		// } else {
		// 	return state;
		// }
	}

	render(){
		let loading = Object.keys(this.state.users).length === 0 || this.state.posts.length === 0;
		if(loading) return null;
		const { posts, currentUser, users } = this.state;
			
		return(
			<div className='index-container'>
				<ul className='index-ul'>
							{loading ? null : posts.map((post, i) => (<li key={i}><PostShowContainer post={post} user={users[post.userId + '']}/></li>))}
				</ul>
			</div>
		)
	}

}

export default PostIndex;
