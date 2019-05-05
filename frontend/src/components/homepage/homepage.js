import React from 'react';
// import './homepage.css';

class Homepage extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			currentUser: this.props.currentUser
		}
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentWillReceiveProps(nextProps){
		// if(nextProps.currentUser){
		// 	this.setState({currentUser: nextProps.currentUser})
		// } else {
		// 	this.setState({currentUser: null})
		// }
		this.setState({currentUser: nextProps.currentUser})
	}

	handleLogout(e){
		e.preventDefault();
		this.props.logout();
		this.props.history.push('/signup');
	};

	render() {
		return (
			<div>
				<h1>Postgram</h1>
				{this.state.currentUser ? <h2>Hi, {this.state.currentUser.username}!</h2> : null}
				<footer>
				&copy; 2019 POSTGRAM
				</footer>
				{this.state.currentUser ? <button onClick={this.handleLogout}>Log Out</button> : null}
			</div>
		);
	};
}

export default Homepage;