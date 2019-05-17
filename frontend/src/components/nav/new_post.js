import React from 'react';
import '../css/new_post.css';

class NewPost extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			currentUser: this.props.currentUser,
			errors: this.props.errors,
			text: '',
			photoUrl: null
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFile = this.handleFile.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleKeyPress(e){
		if (e.keyCode === 27) {
			this.props.closeModal();
		}
	}

	componentDidMount(){
		document.addEventListener('keydown', this.handleKeyPress, false);
	}

	componentWillUnmount(){
		document.removeEventListener('keydown', this.handleKeyPress, false);
	}


	handleSubmit(e){
		e.preventDefault();

	}

	handleFile(e){
		e.preventDefault();

	}

	updateText(e){
		e.preventDefault();
		this.setState({text: e.currentTarget.value});
	}

	render(){
		return(
			<div className='new-post-container' >
				
				<div className='new-post-upper'>
					<div className='new-post-avatar-box'>
						<img src={this.state.currentUser.avatarUrl} className='new-post-profile' />
					</div>
					<input className='new-post-input' type='text' placeholder='Write a caption...' onChange={e => this.updateText(e)} value={this.state.text} />
				</div>
				<div className='new-post-lower'>
				<input type='file' accept='image/*' />
				</div>
			</div>
		)
	}






}

export default NewPost;