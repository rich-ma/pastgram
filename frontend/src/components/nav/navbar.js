import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

class NavBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: this.props.currentUser
		}
	};

	componentWillReceiveProps(nextProps){
		console.log('in cwrp navbar');
		console.log(nextProps);
		if (nextProps.currentUser) {
			this.setState({
				user: nextProps.currentUser
			});
		} else{
			this.setState({user: null})
		}
		console.log(this.state.user);
	};

	render(){
		return(
			<nav className='navbar-container'>
				<div className='navbar'>
					<div className='nav-left'>
					<i className="fab fa-instagram"></i>
					<h1 className='nav-title'>Postgram</h1>
					</div>
					<input className='nav-search' type="text" placeholder="Search.." />
					<Link className='session-link' to={`/users/${this.state.user.id}`}><i className="far fa-user"></i></Link>
				</div>
			</nav>
		)
	}
}

export default NavBar;