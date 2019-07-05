import React from 'react';
import PostShowContainer from '../homepage/post_show_container';

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
			users: this.state.users,
			currentPage: this.state.currentPage
		});
	}

	static getDerivedStateFromProps(newProps, state){
		if(newProps.currentPage !== state.currentPage){
			let posts = state.posts.concat(newProps.posts);
			return({
				currentPage: newProps.currentPage,
				totalPages: newProps.currentPage,
				users: newProps.users,
				posts,
				loading: false
			})
		} else {
			console.log('no new posts');
			return state;
		}
	}

	render(){
		const { posts, currentUser, users } = this.state;
		console.log('state users', users);
			
		return(
			<div className='index-container'>
				<ul className='index-ul'>
					
				</ul>
			</div>
		)
	}

}

export default PostIndex;

	// {posts.map( post => {
	// 					return(
	// 						<li key={post.id}>
	// 							<PostIndexItemContainer post={post} currentUser={currentUser} />
	// 						</li>
	// 					)
	// 				})}

	// {this.state.loading ? null : posts.map(post => (<li key={post.id} ><PostShowContainer post={post} user={users[post.userId + '']}/></li>))}