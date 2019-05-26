import axios from 'axios';


//need to write route
export const updateUser = userData => {
	return axios.patch(`/api/users/${userData.id}`, userData);
}

export const getUser = id => {
	return axios.get(`/api/users/${id}`);
}