import React from 'react';

class NewPost extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			currentUser: this.props.currentUser,
			errors: this.props.errors,
			text: null,
			photoUrl: null
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFile = this.handleFile.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();

	}

	handleFile(e){
		e.preventDefault();

	}

	updateText(e){
		e.preventDefault();
		this.setState({text: e.currentUser.value});
	}

	render(){
		return(
			<div className='new-post-container' >
				<div className='new-post-upper'>
					<img src={this.state.currentUser.avatarUrl} className='new-post-profile' />
					<input type='text' placeholder='Write a caption...' onChange={e => this.updateText(e)} value={this.state.text} />
				</div>
				<div className='new-post-lower'>
				<input type='file' accept='image/*' />
				</div>
			</div>
		)
	}






}

export default NewPost;