import React from 'react';
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
			likeLoading: false
		}
		this.addComment = this.addComment.bind(this);
		this.toggleLike = this.toggleLike.bind(this);
	}

	componentWillMount(){
		this.props.fetchPostShow(this.props.postId);
	}

	componentWillReceiveProps(newProps){
		this.setState({post: newProps.post, loading: false});
			if(newProps.post.likes.includes(this.props.currentUserId)){
				this.setState({like: true})
			} else {
				this.setState({like: false})
			}
		if(newProps.user) this.setState({user: newProps.user});
	}

	toggleLike(){
		this.setState({loading: true});
		const data = {
			userId: this.props.currentUserId,
			postId: this.state.post._id
		}
		if(this.state.like){
			this.props.unlikePost(data).then(() => {
				this.setState({like: false, loading: false});
			})
		} else {
			this.props.likePost(data).then(() => {
				this.setState({like: true, loading: false})
			})
		}
	}


	addComment(){

	}

	render(){
		if(this.state.loading) return null;

		const { post, user } = this.state;

		const profileContainer = profile(user);
		const imageContainer = postImage(post);

		const date = getDate(new Date(post.date));

		const postInfo = ( 
		<div className='post-info'>
			<div className='post-likes-comments'>
				<i onClick={this.toggleLike} className="post-info-icon far fa-heart"></i>
				<i className="post-info-icon far fa-comment"></i>
			</div>
				<div className='post-likes-container'>
					Liked by <h3 className='post-likes'>{this.state.post.likes.length}</h3>{this.state.post.likes.length === 1 ? 'person' : 'people'}
				</div>
			<h4 className='post-date'>{date}</h4>
		</div>
		)

		return(
			<div className='post-show-container'>
				<div className='post-show-mobile'>
					{profileContainer}
					{imageContainer}
					{postInfo}
				</div>
				<div className='post-show-desktop'>
					<div className='post-show-desktop-left'>
						{imageContainer}
					</div>
					<div className='post-show-desktop-right'>
						{profileContainer}
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