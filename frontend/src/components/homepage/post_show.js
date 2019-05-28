import React from 'react';
import { profile, postImage } from '../../util/post_util';
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
	}

	componentWillMount(){
		this.props.fetchPostShow(this.props.postId);
	}

	componentWillReceiveProps(newProps){
		this.setState({post: newProps.post, loading: false});
		if(newProps.user) this.setState({user: newProps.user});
		const likeStatus = newProps.post.likes.includes(newProps.currentUserId);
		this.setState({like: likeStatus});
	}


	addComment(){

	}

	render(){
		if(this.state.loading) return null;

		const { post, user } = this.state;

		const profileContainer = profile(user);
		const imageContainer = postImage(post);

		return(
			<div className='post-show-container'>
				<div className='post-show-mobile'>
					{profileContainer}
					{imageContainer}
					<PostInfo loading={this.state.loading} likePost={this.props.likePost} unlikePost={this.props.unlikePost} post={post} currentUserId={this.props.currentUserId} />
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
						<PostInfo post={post} likePost={this.props.likePost} unlikePost={this.props.unlikePost} loading={this.state.loading} currentUserId={this.props.currentUserId} />
					</div>
				</div>
			</div>
		)
	}
}

export default PostShow;