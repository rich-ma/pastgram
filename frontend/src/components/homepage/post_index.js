import React from 'react';
import PostIndexItemContainer from './post_index_item_container';

class PostIndex extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentPage: this.props.currentPage,
			totalPages: this.props.totalPages,
			currentUser: this.props.currentUser,
			posts: this.props.posts,
			loading: true
		}
	}

	render(){
		const { posts, currentUser } = this.state;

		const index = (
			<div className='index-container'>
				<ul className='index-ul'>
				
				</ul>
			</div>
		)

		return(
			<h1>test</h1>
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