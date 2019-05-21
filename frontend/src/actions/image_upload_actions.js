import { uploadImage } from '../util/image_upload_util';

export const RECEIVE_UPLOAD_ERRORS = 'RECEIVE_UPLOAD_ERRORS';
export const RECEIVE_IMAGE_URL = 'RECEIVE_IMAGE_URL';

export const receiveErrors = errors => ({
	type: RECEIVE_UPLOAD_ERRORS,
	errors
})

export const receiveImageUrl = url => ({
	type: RECEIVE_IMAGE_URL,
	url
})

export const newImage = image => dispatch => {
	uploadImage(image)
		.then(url => dispatch(receiveImageUrl(url)))
		.catch(err => dispatch(receiveErrors(err.response.data)))
};