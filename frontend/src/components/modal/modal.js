import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import NewPostContainer from '../nav/new_post_container';
import PostShowContainer from '../homepage/post_show_container';
import EditUserContainer from '../homepage/edit_user_container';
import '../css/modal.css';

class Modal extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			modal: this.props.modal
		}

		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	
	handleKeyPress(e){
		if (e.keyCode === 27) {
			this.props.closeModal();
		}
	}

	componentDidMount(){
		document.addEventListener('keydown', this.handleKeyPress, false);
	}

	componentWillUnmount(){
		document.removeEventListener('keydown', this.handleKeyPress, false);
	}

	render(){
		
		const { modal, closeModal } = this.props;
		if(!modal) return null;
		let component;
		
		switch (modal.modalType) {
			case 'newPost':
				component = <NewPostContainer />;
				break;
			case 'postShow':
				component = <PostShowContainer post={modal.data.post} user={modal.data.user} />;
				break;
			case 'editUser':
			  component = <EditUserContainer user={modal.data} />;
			  break;
			default:
				return null;
		}
		return (
			<div className="modal-background" onClick={closeModal}> 
				<div className="modal-child animated fadeIn" 
				onClick={e => e.stopPropagation()}>
					{component}
				</div>
			</div>
		)
	}
}

const mSTP = state => {
	return {
		modal: state.modal
	}
};

const mDTP = dispatch => ({
	closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(Modal);

