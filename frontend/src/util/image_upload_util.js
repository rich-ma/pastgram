import axios from 'axios';

export const uploadImage = image => {
	console.log('in image upload util');
	return axios.post('/api/image-upload/new', image);
}