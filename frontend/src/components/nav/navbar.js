import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';
// withrouter maybe to update after new post? 

class NavBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: this.props.currentUser,
			currentUser: this.props.currentUser
		}
	};

	componentWillReceiveProps(nextProps){
		if (nextProps.currentUser) {
			this.setState({
				user: nextProps.currentUser
			});
		} else{
			this.setState({user: null})
		}
	};

	odal
	

	render(){
		return(
			<nav className='navbar-container'>
				<div className='navbar'>
					<Link className='nav-left' to='/'>
					<i className="fab fa-instagram"></i>
					<h1 className='nav-title'>Postgram</h1>
					</Link>
					<input className='nav-search' type="text" placeholder="Search.." />
					<div className='nav-right'>
						<button onClick=""/>
						<Link className='session-link' to={`/users/${this.state.currentUser.id}`}><i className="far fa-user"></i></Link>
					</div>
				</div>
			</nav>
		)
	}
}

export default NavBar;