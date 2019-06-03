import React from 'react';
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
			errors: null
		}
		//allow user to change password later on

		this.handleSubmit = this.handleSubmit.bind(this);
		this.imagePreview = this.imagePreview.bind(this);
		this.updateField = this.updateField.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			errors: nextProps.errors
		})
	}

		renderErrors(){
		if(!this.state.errors) return null;
		return (
			<ul className='edit-user-errors'>
				{Object.keys(this.state.errors).map((error, i) => (
					<li key={`error-${i}`}>
						{this.state.errors[error]}
					</li>
				))}
			</ul>
		);
	};

	handleSubmit(e){
		e.preventDefault();
	}

	updateField(field){
		return(e) => this.setState({
			[field] : e.currentTarget.value
		})
	};

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
		this.setState({photoFile: file});
	}

	render(){
		const user = this.props.user;

		return(
			<div className='edit-user-container'>
				<div className='edit-user-profile'>
					<label htmlFor='edit-avatar-img' className='edit-profile-avatar'>
						<img alt='user-avatar' src={this.state.photoUrl ? this.state.photoUrl : user.avatarUrl} />
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
				{this.renderErrors()}
				<form action='' onSubmit={this.handleSubmit}>
					<label>
						<h3>Name</h3>
						<input type='text' value={this.state.name} onChange={this.updateField('name')} />
					</label>
					<label>
						<h3>Username</h3>
						<input type='text' value={this.state.username} onChange={this.updateField('username')} />
					</label>
					<label>
						<h3>Bio</h3>
						<textarea type='text' value={this.state.bio} onChange={this.updateField('bio')} />
					</label>
					<button className='edit-user-submit' onClick={this.handleSubmit} >Submit</button>
					<button className='logout' onClick={this.props.logout}>Logout</button>
				</form>
			</div>
		)
	}
}

export default EditUser;