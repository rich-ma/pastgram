import React from 'react';
import { getDate } from '../../util/post_util';

class PostInfo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			like: false,
			loading: false,
			post: this.props.post,
			currentUserId: this.props.currentUserId
		}
		this.toggleLike = this.toggleLike.bind(this);
	}

	toggleLike(){
		this.setState({loading: true});
		if(this.state.like){
			this.props.unlikePost({
				userId: this.props.currentUserId,
				postId: this.state.post.id
			}).then(() => {
				this.setState({like: true, loading: false});
			})
		} else {
			this.props.unlikePost({
				userId: this.props.currentUserId,
				postId: this.state.post.id
			}).then(() => {
				this.setState({like: false, loading: false})
			})
		}
	}

	render(){
		const post = this.state.post;
		const date = getDate(new Date(post.date));

		return( 
		<div className='post-info'>
			<div className='post-likes-comments'>
				<i onClick={this.toggleLike} className="post-info-icon far fa-heart"></i>
				<i className="post-info-icon far fa-comment"></i>
			</div>
				<div className='post-likes-container'>
					Liked by <h3 className='post-likes'>{post.likes.length}</h3>{post.likes.length === 1 ? 'person' : 'people'}
				</div>
			<h4 className='post-date'>{date}</h4>
		</div>
		)
	}

}

export default PostInfo;



