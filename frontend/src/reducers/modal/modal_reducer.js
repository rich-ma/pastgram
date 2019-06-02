import { OPEN_MODAL, CLOSE_MODAL } from '../../actions/modal_actions';

const modalReducer = (state = {modalType: null, data: {}}, action) => {
  Object.freeze(state);

	let newState = Object.assign({}, state);
	
  switch (action.type) {
    case OPEN_MODAL:
			newState.modalType = action.data.modal;
			newState.data = action.data.data;
      return newState;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
