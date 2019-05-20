import { uploadImage } from '../util/image_upload_util';

export const RECEIVE_UPLOAD_ERRORS = 'RECEIVE_UPLOAD_ERRORS';

export const receiveErrors = errors => ({
	type: RECEIVE_UPLOAD_ERRORS,
	errors
})

export const newImage = image => dispatch => {
	uploadImage(image)
		.

}