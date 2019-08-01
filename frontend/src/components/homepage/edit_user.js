import React from 'react';
import axios from 'axios';
import '../css/edit_user.css';


class EditUser extends React.Component{
	constructor(props){
		super(props);
		const user = this.props.user;
		this.state = {
			username: user.username,
			name: user.name,
			avatarUrl: user.avatarUrl,
			bio: user.bio,
			photoUrl: null,
			photoFile: null,
			errors: this.props.errors,
			edited: false
		}
		//allow user to change password later on

		this.handleSubmit = this.handleSubmit.bind(this);
		this.imagePreview = this.imagePreview.bind(this);
		this.updateField = this.updateField.bind(this);
		this.logout = this.logout.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors.user){
			this.setState({
				errors: {user: nextProps.errors.user}
			});
		} else {
			const user = nextProps.user;
			this.setState({
				username: user.username,
				name: user.name,
				avatarUrl: user.avatarUrl,
				bio: user.bio
			})
		}
	}

		

	handleSubmit(e){
		e.preventDefault();
		this.setState({errors: {post: null, user: null}});

		if(this.state.photoUrl){
			const data = new FormData();
			data.append('image', this.state.photoFile);
			axios.post('/api/image-upload/new', data).then(res => {
				const data = {
					user: {
						username: this.state.username,
						bio: this.state.bio,
						avatarUrl: res.data.imageUrl,
						name: this.state.name
					},
					userId: this.props.user._id
				};
				this.props.updateUser(data)
			}).catch(err => this.setState({
				'errors': {
					image: err.response.data
				}
			}))
		} else {
			const data = {
				user: {
					username: this.state.username,
					bio: this.state.bio,
					avatarUrl: this.state.avatarUrl,
					name: this.state.name
				},
				userId: this.props.user._id
			};

			this.props.updateUser(data);
		}
	}

	updateField(field){
		return (e) => {
			this.setState({
				[field] : e.currentTarget.value
			});
			if(e.currentTarget.value !== this.props.user[field]){
				this.setState({edited: true});
				const submit = document.getElementById('edit-submit');
				submit.classList.remove('submit-void');
			}
		}
	};

	logout(){
		this.props.closeModal();
		this.props.logout();
		this.props.history.push('/');
	}

	imagePreview(e){
		e.preventDefault();
		const reader = new FileReader();
		const file = e.currentTarget.files[0];
		reader.onloadend = () =>
      this.setState({
      	photoUrl: reader.result,
      	photoFile: file
      });
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ PhotoUrl: "" , PhotoFile: null });
		}
		this.setState({photoFile: file, edited: true});
		const submit = document.getElementById('edit-submit');
		submit.classList.remove('submit-void');
	}
	
	renderErrors(){
		return(
			<ul className='edit-user-errors'>
				{ this.state.errors.image ? Object.keys(this.state.errors.image).map((error, i) => (
					<li key={`edit-user-error-${i}`}>
						{this.state.errors.image[error]}
					</li>
				)) : null }
				{ this.state.errors.user ? Object.keys(this.state.errors.user).map((error, i) => (
					<li key={`edit-user-error-${i}`}>
						{this.state.errors.user[error]}
					</li>
				)) : null }
			</ul>
			);
	}

	render(){
		const user = this.props.user;

		return(
			<div className='edit-user-container'>
				<div className='edit-user-header'>
					<i className="fas fa-times" onClick={this.props.closeModal}></i>
					<h3>Edit Profile</h3>
					<div className='placeholder'>히</div>
				</div>
				<div className='edit-user-profile'>
					<label htmlFor='edit-avatar-img' className='edit-profile-avatar'>
						<div className='edit-avatar-container'>
							<img alt='user-avatar' src={this.state.photoUrl ? this.state.photoUrl : user.avatarUrl} />
						</div>	
						<input type='file' accept='image/*' id='edit-avatar-img' onChange={e => this.imagePreview(e)} />
					</label>
					<div className='edit-profile-name'>
						<h3 className='edit-profile-username'>{this.state.username}</h3>
						<label htmlFor='edit-avatar-text'>
							<h3 className='edit-profile-avatar-button'>Change Profile Photo</h3>
							<input type='file' id='edit-avatar-text' accept='image/*' onChange={e => this.imagePreview(e)} />
						</label>
					</div>
				</div>
				<form className='edit-user-form' action='' onSubmit={this.handleSubmit}>
					{this.renderErrors()}
					<div className='edit-user-input'>
						<h3>Name</h3>
						<input type='text' value={this.state.name} onChange={this.updateField('name')} />
					</div>
					<div className='edit-user-input'>
						<h3>Username</h3>
						<input type='text' value={this.state.username} onChange={this.updateField('username')} />
					</div>
					<div className='edit-user-input'>
						<h3>Bio</h3>
						<textarea type='text' value={this.state.bio} onChange={this.updateField('bio')} />
					</div>
					<div className='edit-user-buttons'>
						<button className='edit-user-submit submit-void' id='edit-submit' onClick={this.handleSubmit} >Submit</button>
						<button className='logout' onClick={this.logout}>Logout</button>
					</div>
					</form>
			</div>
		)
	}
}

export default EditUser;