import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import LoginFormContainer from '../../components/session/login_form_container';
import SignupFormContainer from '../../components/session/signup_form_container';
import NavbarContainer from '../nav/navbar_container';
import '../css/homepage.css';
import ProfileContainer from './profile_container';


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
			this.props.history.push('/login');
		}
	}

	handleLogout(e){
		e.preventDefault();
		this.props.logout();
		this.props.history.push('/');
	};

	render() {
		const loggedIn = () => (
			< div className='homepage-container' >
				<Route path='/' component={NavbarContainer} />
					<Route exact path='/users/:userId' component={ProfileContainer} />
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