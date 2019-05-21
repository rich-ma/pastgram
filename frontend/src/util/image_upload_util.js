import axios from 'axios';

export const uploadImage = image => {
	return axios.post('/api/image-upload/new', image);
}