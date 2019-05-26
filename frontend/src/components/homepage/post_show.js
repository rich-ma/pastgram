import React from 'react';
import '../css/post_show.css';

class PostShow extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: this.props.user,
			post: this.props.post
		}

		this.toggleLike = this.toggleLike.bind(this);
		this.addComment = this.addComment.bind(this);
	}

	componentWillMount(){
		this.props.getPostShow(this.props.postId);
	}

	toggleLike(){

	}

	addComment(){

	}

	render(){
		const { post, user } = this.state;
		const profile = (
			<div className='post-profile'>
				<div className='post-profile-img-container'>
					<img src={user.avatarUrl} alt='user-avatar'/>
				</div>
				<h3>{user.avatarUrl}</h3>
			</div>
		)

		const postInfo = (
			<div className='post-info'>
				<div className=''>
					<i class="far fa-heart"></i>
					<i class="far fa-comment"></i>
				</div>
				<h3>{post.likes.length}</h3>
				<h4>date here</h4>
			</div>
		)

		//need to add comments, add input for comments
		return(
			<div className='post-show-container'>
				<div className='post-show-mobile'>
					{profile}
					<img src={this.state.post.url} alt='post' />
					{postInfo}
				</div>
				<div className='post-show-desktop'>
					<img src={this.state.post.url} alt='post' />
					<div className='post-show-desktop-right'>
						{profile}
						<div>
						Comments
						</div>
						{postInfo}
					</div>
				</div>
			</div>
		)
	}
}

export default PostShow;