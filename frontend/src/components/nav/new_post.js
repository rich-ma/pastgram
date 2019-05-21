import React from 'react';
import axios from 'axios';
import '../css/new_post.css';

class NewPost extends React.Component{

	constructor(props){
		super(props);
		console.log(this.props.errors);
		this.state = {
			currentUser: this.props.currentUser,
			errors: this.props.errors,
			text: '',
			photoUrl: null,
			photoFile: null
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFile = this.handleFile.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.imagePreview = this.imagePreview.bind(this);
	}

	// componentWillReceiveProps(newProps){
	// 	this.setState({'errors': newProps.errors})
	// }

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

	imagePreview(e){
		e.preventDefault();
		const reader = new FileReader();
		const file = e.currentTarget.files[0];
		reader.onloadend = () =>
      this.setState({ photoUrl: reader.result, photoFile: file });
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ PhotoUrl: "" , PhotoFile: null });
		}
	}

	handleFile(e){
		e.preventDefault();
		this.setState({errors: null});
		const data = new FormData();
		data.append('image', this.state.file);
		axios.post('/api/image-upload/new', data).then(res => {
			this.setState({'photoUrl': res.data.imageUrl});
		})
		.catch(err => this.setState({"errors": {image: err.response.data, post: this.state.post}}));
	}

	updateText(e){
		e.preventDefault();
		this.setState({text: e.currentTarget.value});
		console.log(this.state);
	}

	renderPostErrors(){
		if(!this.state.errors.post) return null;
		console.log(this.state.errors.post);
		return (
			<ul className='post-errors'>
				{Object.keys(this.state.errors.post).map((error, i) => (
					<li key={`error-${i}`}>
						{this.state.errors.post[error]}
					</li>
				))}
			</ul>
		);
	};

	renderImageErrors(){
		if(!this.state.errors.image) return null;
		return (
			<ul className='post-errors'>
				{Object.keys(this.state.errors.image).map((error, i) => (
					<li key={`error-${i}`}>
						{this.state.errors.image[error]}
					</li>
				))}
			</ul>
		);
	};

	render(){
		return(
			<div className='new-post-container' >
				<div className='new-post-header'>
					<i className="fas fa-times" onClick={this.props.closeModal}></i>
					<h3 className='new-post-title'>New Photo Post</h3>
					<h3 className='new-post-submit' onClick={this.handleSubmit}>Share</h3>
				</div>
				{this.renderImageErrors()}
				{this.renderPostErrors()}
				<div className='new-post-upper'>
					<div className='new-post-avatar-box'>
						<img src={this.state.currentUser.avatarUrl} className='new-post-profile' />
					</div>
					<textarea className='new-post-input' type='text' placeholder='Write a caption...' onChange={e => this.updateText(e)} value={this.state.text} ></textarea>
				</div>
				<div className='new-post-lower'>
				<img src={this.state.photoUrl} />
				<input type='file' accept='image/*' onChange={e => this.updateImage(e)} />
				</div>
			</div>
		)
	}






}

export default NewPost;