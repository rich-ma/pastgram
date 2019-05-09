import React from 'react';
import '../css/profile.css';
class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentUser: this.props.currentUser
		}

	}

	componentWillReceiveProps(nextProps){
		if(nextProps.currentUser){
			this.setState({currentUser: nextProps.currentUser});
		} else {
			this.setState({currentUser: null});
		}
	}

	render(){

		// const button = //button that changes, if profile is current users, edit account, otherwise, follow/unfollow
		return (
			<div className='user-info'>
				<div className='user-info-upper'>
					<div className='avatar-box'>
						<img src="https://cdn.vox-cdn.com/thumbor/J1TQtsd9qNHT3BfL-YLtgDW05dI=/0x0:1777x970/920x613/filters:focal(747x343:1031x627):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63725038/sonic.0.jpg" className='user-avatar' />
					</div>
					<div className='user-info-container'>
						<div className='user-mobile'>
							<h3 className='username'>{this.state.currentUser.username}</h3>
							<button className='profile-button'>Nothing</button>
						</div>
						<div className='user-desktop'>
							<ul className='user-data'>
								<li>posts desktop</li>
								<li>followers</li>
								<li>following</li>
							</ul>
							<h3>Users real name</h3>
							<h4>Followed by ...</h4>
						</div>
					</div>
				</div>
				<div className='user-mobile'>
					<h3 className='user-realname'>Users real name</h3>
					<h4 className='mobile-followers'>Followed by ...</h4>
					<ul className='user-data'>
						<li>posts</li>
						<li>followers</li>
						<li>following</li>
					</ul>
				</div>
			</div>
		)
	}

}

export default Profile;

// <img src={`this.state.`}