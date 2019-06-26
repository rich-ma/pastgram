import React from 'react';
import postShowContainer from '../homepage/post_show_container';

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
		console.log('new props' , newProps);
		console.log('state', state);
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
			return state;
		}
	}

	componentDidUpdate(){
		console.log('componentdidupdate',this.props);
	}

	render(){
		const { posts, currentUser } = this.state;

		const index = ( 
			<div className='index-container'>
			<button onClick={this.props.fetchPosts}>Fetch</button>
				<ul className='index-ul'>
				</ul>
			</div>
		)

		return(
			<div className='index-container'>
			<button onClick={this.props.fetchPosts}>Fetch</button>
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