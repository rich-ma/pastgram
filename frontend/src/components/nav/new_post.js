import React from 'react';
import axios from 'axios';
import '../css/new_post.css';

class NewPost extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			currentUser: this.props.currentUser,
			errors: this.props.errors,
			text: '',
			newPost: this.props.newPost,
			photoUrl: undefined,
			photoFile: undefined,
			edited: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.imagePreview = this.imagePreview.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors.post){
			this.setState({errors: {post: nextProps.errors.post}});
		};

		if(nextProps.newPost){
			this.props.closeModal();
			this.props.history.push(`/posts/${nextProps.newPost._id}`);
		}
	}

	handleSubmit(e){
		e.preventDefault();
		this.setState({errors: {post: null, image: null}});
		const data = new FormData();
		data.append('image', this.state.photoFile);
		axios.post('/api/image-upload/new', data).then(res => {
			const data = {
				post: {
					userId: this.state.currentUser.id,
					text: this.state.text,
					url: res.data.imageUrl
				},
				user: this.state.currentUser
			};
			this.props.writePost(data);
		})
		.catch(err => this.setState({"errors": {image: err.response.data, post: this.state.post}}));
	}

	imagePreview(e){
		e.preventDefault();
		const reader = new FileReader();
		const file = e.currentTarget.files[0];
		reader.onloadend = () =>
      this.setState({ photoUrl: reader.result, photoFile: file });
    if (file) {
			reader.readAsDataURL(file);
			if (this.state.text !== '') {
				this.setState({edited: true});
				const submit = document.getElementById('new-post-submit');
				submit.classList.remove('submit-disable');
			};
    } else {
      this.setState({ PhotoUrl: "" , PhotoFile: null });
		}
		this.setState({photoFile: file});
	}

	updateText(e){
		e.preventDefault();
		this.setState({text: e.currentTarget.value});
		if(this.state.photoFile){
			this.setState({edited: true});
			const submit = document.getElementById('new-post-submit');
			submit.classList.remove('submit-disable');
		}
	}

	renderPostErrors(){
		if(!this.state.errors.post) return null;
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
					<h3 className='new-post-submit submit-disable' id='new-post-submit' onClick={this.handleSubmit}>Share</h3>
				</div>
				{this.renderImageErrors()}
				{this.renderPostErrors()}
				<div className='new-post-upper'>
					<div className='new-post-avatar-box'>
						<img src={this.state.currentUser.avatarUrl} className='new-post-profile' alt={`${this.state.currentUser.username}'s avatar`}/>
					</div>
					<textarea className='new-post-input' type='text' placeholder='Write a caption...' onChange={e => this.updateText(e)} value={this.state.text} ></textarea>
				</div>
				<div className='new-post-lower'>
					<div className='new-post-image-container'>
						<img alt='' className='post-preview' src={this.state.photoUrl} />
					</div>
					<input type='file' accept='image/*' onChange={e => this.imagePreview(e)} />
				</div>
			</div>
		)
	}






}

export default NewPost;