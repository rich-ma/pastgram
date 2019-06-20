import React from 'react';

class PostIndexItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			post: this.props.post,
			currentUser: this.props.currentUser
		}
	}

	render(){
		return(<h1>hi</h1>)
	}


}

export default PostIndexItem;