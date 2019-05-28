import React from 'react';

class PostInfo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			like: this.props.like,
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








}