import React from 'react';
import { Link } from 'react-router-dom';
import { profile, postImage, getDate } from '../../util/post_util';
import PostInfo from './post_info';
import '../css/post_show.css';

class PostShow extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: this.props.user,
			post: this.props.post,
			loading: true,
			like: false,
			likeLoading: false,
			currentUserId: this.props.currentUserId,
			toggle: false
		}
		this.addComment = this.addComment.bind(this);
		this.toggleLike = this.toggleLike.bind(this);
		this.toggleDrop = this.toggleDrop.bind(this);

		if (this.props.isPostShow) {
			this.props.fetchPostShow(this.props.postId);
		} else {
			if (this.props.post.likes.includes(this.props.currentUserId)) {
				this.setState({
					like: true,
					loading: false
				});
			} else {
				this.setState({
					like: false,
					loading: false
				});
			}
		}
	}

	static getDerivedStateFromProps(newProps, state){
		let like = undefined;
		if(newProps.post){
			like = newProps.post.likes.includes(state.currentUserId);
				return ({
					like,
					user: newProps.user ? newProps.user : state.user,
					loading: false,
					post: newProps.post
				})
		} else {
			return state;
		}
	}

	toggleLike(){
		this.setState({likeLoading: true});
		const data = {
			userId: this.props.currentUserId,
			postId: this.state.post._id
		}
		if(this.state.like){
			this.props.unlikePost(data).then(() => {
				this.setState({like: false, likeLoading: false});
			})
		} else {
			this.props.likePost(data).then(() => {
				this.setState({like: true, likeLoading: false});
			})
		}
	}

	toggleDrop(){
		this.setState({toggleDrop: !this.state.toggleDrop})
	}

	addComment(){

	}

	render(){
		if(this.state.loading) return null;

		const { post, user } = this.state;

		let likeClassName = this.state.like ? 'post-info-icon liked-heart fas fa-heart' : 'post-info-icon far fa-heart';

		const profileContainer = profile(user);
		const imageContainer = postImage(post);

		const date = getDate(new Date(post.date));

		const dropdown = (
			<div >
				<div className='close-postshow-dropdown' onClick={this.toggleDrop}/>
				<div className='postshow-dropdown'>
					<ul className="postshow-ddul">
					<li><Link to={`/posts/${this.state.post._id}`}>Go to post</Link></li>
						<li>Copy link to post</li>
						<li onClick={this.toggleDrop}>Cancel</li>
					</ul>
				</div>
			</div>
		);

		const postInfo = ( 
		<div className='post-info'>
			<div className='post-likes-comments'>
				<i onClick={this.state.likeLoading ? null : this.toggleLike} id='like' className={likeClassName}></i>
				<i className="post-info-icon far fa-comment"></i>
			</div>
				<div className='post-likes-container'>
					Liked by <h3 className='post-likes'>{this.state.post.likes.length}</h3>{this.state.post.likes.length === 1 ? 'person' : 'people'}
				</div>
			<h4 className='post-date'>{date}</h4>
		</div>
		)

		const postProfile = this.props.isPostShow ? (
			<div className='profile-container'>
				{profileContainer}
			</div>
		) : (
			<div className='extended-profile-container'>
				{profileContainer}
				<div className='profile-right'>
					<i className="fas fa-ellipsis-h post-dropdown" 
					onClick={this.toggleDrop}></i>
					{this.state.toggleDrop ? dropdown : <div />}
				</div>
			</div>
		)



		if(this.props.isIndex){
			return (
				<div className='post-show-index'>
					{postProfile}
					{imageContainer}
					{postInfo}
				</div>
			)
		} else {
			return(
			< div className={this.props.isPostShow ? `post-show-container post-show` : `post-show-container`} >
				<div className='post-show-mobile'>
					{postProfile}
					{imageContainer}
					{postInfo}
				</div>
				<div className='post-show-desktop'>
					<div className='post-show-desktop-left'>
						{imageContainer}
					</div>
					<div className='post-show-desktop-right'>
						{postProfile}
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
}

export default PostShow;

// <div className='extended-profile-container'>
// 						{profileContainer}
// 						<i class="fas fa-ellipsis-h"></i>
// 					</div>