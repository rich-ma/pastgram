import axios from 'axios';


//need to write route
export const updateUser = userData => {
	return axios.patch(`/api/users/${userData.id}`, userData);
}

export const getUser = id => {
	return axios.get(`/api/users/${id}`);
}

export const followUser = data => {
	return axios.post(`/api/users/follow/${data.userId}`, data)
}

export const unfollowUser = data => {
	return axios.post(`/api/users/unfollow/${data.userId}`, data)
}

// export const seedUsers = () => {
// 	return axios.post('/api/users/seed');
// }