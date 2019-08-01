import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
			toggle: false,
			index: this.props.index
		}
		this.addComment = this.addComment.bind(this);
		this.toggleLike = this.toggleLike.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);

		if (this.props.isPostShow) {
			this.props.fetchPostShow(this.props.postId);
			this.props.closeModal();
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
		if(newProps.postUpdate && newProps.isPostShow){
			const post = newProps.postUpdate;
			like = post.likes.includes(state.currentUserId);
			return ({
				like,
				post
			})
		} else if(newProps.post){
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
		console.log(this.state);
		const data = {
			userId: this.props.currentUserId,
			postId: this.state.post._id,
			index: this.state.index
		}
		if(this.state.like){
			console.log(data);
			this.props.unlikePost(data).then(() => {
				this.setState({like: false, likeLoading: false});
			})
		} else {
			console.log(data);
			this.props.likePost(data).then(() => {
				this.setState({like: true, likeLoading: false});
			})
		}
	}

	toggleMenu(){
		this.setState({toggleMenu: !this.state.toggleMenu})
	}

	addComment(){

	}

	render(){
		if(this.state.loading) return null;

		const { post, user } = this.state;

		
		if(this.props.isPostShow){
			user['id'] = user['_id'];
		}

		let likeClassName = this.state.like ? 'post-info-icon liked-heart fas fa-heart' : 'post-info-icon far fa-heart';

		const profileContainer = profile(user);
		const imageContainer = postImage(post);

		const date = getDate(new Date(post.date));
		const link = `http://localhost:3000/#/posts/${post._id}`;

		const menu = (
			<div >
				<div className='close-postshow-menu' onClick={this.toggleMenu}/>
				<div className='postshow-menu'>
					<ul className="postshow-mul">
						<li><Link to={`/posts/${this.state.post._id}`} className='postlink' onClick={this.toggleMenu}>Go to post</Link></li>
						<li><CopyToClipboard text={link}><div className='postlink-button'>Copy link</div></CopyToClipboard></li>
						<li onClick={this.toggleMenu}>Cancel</li>
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
					<i className="fas fa-ellipsis-h post-menu" 
					onClick={this.toggleMenu}></i>
					{this.state.toggleMenu ? menu : <div />}
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
