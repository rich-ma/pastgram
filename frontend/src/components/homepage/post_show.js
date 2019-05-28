import React from 'react';
import { getDate, profile, postInfo, postImage } from '../../util/post_util';
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
		const date = getDate(new Date(post.date));

		const profileContainer = profile(user);
		const postInfoContainer = postInfo(post);
		const imageContainer = postImage(post);



		//need to add comments, add input for comments
		return(
			<div className='post-show-container'>
				<div className='post-show-mobile'>
					{profileContainer}
					{imageContainer}
					{postInfoContainer}
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
						{postInfoContainer}
					</div>
				</div>
			</div>
		)
	}
}

export default PostShow;