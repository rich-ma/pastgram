import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../../util/route_util';
import LoginFormContainer from '../../components/session/login_form_container';
import SignupFormContainer from '../../components/session/signup_form_container';
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
		if(nextProps.currentUser){
			this.setState({currentUser: nextProps.currentUser})
		} else {
			this.setState({currentUser: null})
		}
	}

	handleLogout(e){
		e.preventDefault();
		this.props.logout();
		this.props.history.push('/');
	};

	render() {
		const loggedIn = () => (
			<div>
				<h1>Postgram</h1>
				{this.state.currentUser ? <h2>Hi, {this.state.currentUser.username}!</h2> : null}
				{!this.state.currentUser ? <h2>Nobody logged in!</h2> : null}
				<footer>
				&copy; 2019 POSTGRAM
				</footer>
				{this.state.currentUser ? <button onClick={this.handleLogout}>Log Out</button> : null}
			</div>
		)
		const splash = () => (
			<div>
				<Switch>
					<Route path='/' component={SignupFormContainer} />	
				</Switch>
			</div>
		);


		return this.state.currentUser ? loggedIn() : splash();
	};
	
}

export default Homepage;