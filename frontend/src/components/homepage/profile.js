import React from 'react';

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
		return (
			<div className='user_info'>
				<img src="https://cdn.vox-cdn.com/thumbor/J1TQtsd9qNHT3BfL-YLtgDW05dI=/0x0:1777x970/920x613/filters:focal(747x343:1031x627):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63725038/sonic.0.jpg" />
				<div className='user-info-container'>
					<div className='user-mobile'>
						<h3>{this.state.currentUser.username}</h3>
						
					</div>
					<div className='user-larger'>
					</div>
				</div>
			</div>
		)
	}

}

export default Profile;

<img src={`this.state.`}