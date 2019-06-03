import React from 'react';

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
			photoFile: null
		}
		//allow user to change password later on

		this.handleSubmit = this.handleSubmit.bind(this);
		this.imagePreview = this.imagePreview.bind(this);
		this.updateField = this.updateField.bind(this);
	}

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
					<label for='edit-avatar-img' className='edit-profile-avatar'>
						<img alt='user-avatar' src={this.state.photoUrl ? this.state.photoUrl : user.avatarUrl} />
						<input type='file' accept='image/*' id='edit-avatar-img' onChange={e => this.imagePreview(e)} />
					</label>
					<div className='edit-profile-name'>
						<h3 className='edit-profile-username'>{user.username}</h3>
						<label for='edit-avatar-text'>
							<h3 className='edit-profile-avatar-button'>Change Profile Photo</h3>
							<input type='file' id='edit-avatar-text' accept='image/*' onChange={e => this.imagePreview(e)} />
						</label>
					</div>
				</div>
			
			</div>
		)
	}





}

export default EditUser;