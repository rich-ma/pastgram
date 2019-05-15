import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import NewPostContainer from '../nav/new_post_container';
// import EditUserContainer from '../homepage/edit_user_container';
import '../css/modal.css';

const Modal = ({ modal, closeModal }) => {

  if (!modal) return null;
  let component;
  switch (modal) {
    case 'newPost':
      component = <NewPostContainer />;
      break;
    // case 'editUser':
    //   component = <EditUserFormContainer />;
    //   break;
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

const mSTP = state => {
	console.log(state.modal);
	return {
		modal: state.modal
	}
};

const mDTP = dispatch => ({
	closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(Modal);

