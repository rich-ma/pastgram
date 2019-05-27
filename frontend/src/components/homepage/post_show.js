import React from 'react';
import '../css/post_show.css';

class PostShow extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: this.props.user,
			post: this.props.post,
			loading: true
		}

		this.toggleLike = this.toggleLike.bind(this);
		this.addComment = this.addComment.bind(this);
	}

	componentWillMount(){
		console.log('in componentwillmount');
		this.props.fetchPostShow(this.props.postId);
	}

	componentWillReceiveProps(newProps){
		console.log('in componentwillreceiveprops');
		console.log(newProps);
		this.setState({user: newProps.user, post: newProps.post, loading: false});
	}

	toggleLike(){

	}

	addComment(){

	}

	render(){
		if(this.state.loading) return null;
		const { post, user } = this.state;
		const profile = (
			<div className='post-profile'>
				<div className='post-profile-img-container'>
					<img src={user.avatarUrl} alt='user-avatar'/>
				</div>
				<h2 className='post-profile-name'>{user.username}</h2>
			</div>
		)

		const postInfo = (
			<div className='post-info'>
				<div className=''>
					<i className="far fa-heart"></i>
					<i className="far fa-comment"></i>
				</div>
				<h3>{post.likes.length}</h3>
				<h4>date here</h4>
			</div>
		)

		const imageContainer = (
			<div className='post-show-img-container'>
				<img src={this.state.post.url} alt='post' />
			</div>
		)

		//need to add comments, add input for comments
		return(
			<div className='post-show-container'>
				<div className='post-show-mobile'>
					{profile}
					{imageContainer}
					{postInfo}
				</div>
				<div className='post-show-desktop'>
					<div className='post-show-desktop-left'>
						{imageContainer}
					</div>
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