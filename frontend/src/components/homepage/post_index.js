import React from 'react';

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
					{posts.map( post => {
						return(
							<li key={post.id}>
								{}
							</li>
						)
					})}
				</ul>
			</div>
		)

		return(
			<h1>postIndex</h1>
		)
	}

}

export default PostIndex;