import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

class NavBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: this.props.currentUser,
			currentUser: this.props.currentUser,
			modal: this.props.modal
		}
	};

	componentWillReceiveProps(nextProps){
		if(nextProps.modal && nextProps.modal.modalType === 'newPost'){
			const button = document.getElementsByClassName('fa-plus-square');
			button[0].classList.remove('far');
			button[0].classList.add('fas');
		} else {
			const button = document.getElementsByClassName('fa-plus-square');
			button[0].classList.remove('fas');
			button[0].classList.add('far');
		}
	};

	render(){
		const openModal = this.props.openModal;


		return(
			<nav className='navbar-container'>
				<div className='navbar'>
					<Link className='nav-left' to='/'>
					<i className="fab fa-instagram"></i>
					<h1 className='nav-title'>Pastgram</h1>
					</Link>
					<input className='nav-search' type="text" placeholder="Search.." />
					<div className='nav-right'>
						<i className="far fa-plus-square" onClick={() => openModal({modal: 'newPost'})}></i>
						<Link className='session-link' to={`/users/${this.state.currentUser.id}`}><i className="far fa-user"></i></Link>
					</div>
				</div>
			</nav>
		)
	}
}

export default NavBar;