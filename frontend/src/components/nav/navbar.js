import React from 'react';
import { Link } from 'react-router-dom';
// import './navbar.css';

class NavBar extends React.Component {
	constructor(props){
		super(props);
		this.logoutUser = this.logoutUser.bind(this);
		this.getLinks = this.getLinks.bind(this);
	}

	logoutUser(e){

	}

	getLinks(){ //dont need this since nav will only show in auth route
		//get correct links for nav depending on user login status.
		if(this.props.loggedIn){
			return (
				<div>
				
				</div>
			)
		} else {
			return (
				<div>
					<Link to={'/signup'}>Signup</Link>
					<Link to={'/login'}>Login</Link>
				</div>
			);
		}
	}

	render(){
		let links = this.getLinks();

		return (
			<nav>
				<h1>Postgram</h1>
				<links />
			</nav>
		);
	}


}