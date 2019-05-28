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
		console.log(post);

		const postDate = new Date(post.date);
		const now = new Date();
		const minDiff = ((now.getTime() - postDate.getTime())/60000);
		const hourDiff = Math.floor(minDiff/60);
		const dayDiff = now.getDate() - postDate.getDate();
		const yearsDiff = now.getFullYear() - postDate.getFullYear();
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		let date;

		if(yearsDiff > 0){
			date = months[Date.getMonth()] + ' ' + postDate.getDate() + ',' + postDate.getFullYear();
		} else if (hourDiff < 1){
			date = Math.ceil(minDiff) + ' minutes ago';
			if(Math.ceil(minDiff) === 1) date = 'a minute ago';
		} else if (hourDiff < now.getHours() && hourDiff === 1){
			date = 'an hour ago';
		} else if (hourDiff < now.getHours() && hourDiff > 1){
			date = hourDiff + ' hours ago';
		}else if (dayDiff === 1){
			date = 'yesterday';
		} else if (dayDiff < 7){
			date = dayDiff + ' days ago';
		}	else {
			date = months[postDate.getMonth()] + ' ' + postDate.getDate();
		}

		console.log(minDiff, hourDiff);

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
				<div className='post-likes-comments'>
					<i className="post-info-icon far fa-heart"></i>
					<i className="post-info-icon far fa-comment"></i>
				</div>
					<div className='post-likes-container'>
						Liked by <h3 className='post-likes'>{post.likes.length}</h3>{post.likes.length === 1 ? 'person' : 'people'}
					</div>
				<h4 className='post-date'>{date}</h4>
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