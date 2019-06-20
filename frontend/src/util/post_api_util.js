import axios from 'axios';

export const getPostShow = postId => {
	return axios.get(`/api/posts/${postId}`);
}

export const getPosts = () => {
	return axios.get('/api/posts');
}

// export const getUserPosts = userId => {
// 	return axios.get(`/api/posts/user/${userId}/all`)
// }

export const createPost = data => {
	return axios.post('/api/posts/', data);
}

export const addLike = data => {
	return axios.post(`/api/posts/like/${data.postId}`, data)
}

export const removeLike = data => {
	return axios.post(`/api/posts/unlike/${data.postId}`, data);
}

export const fetchUserPosts = data => {
	console.log('post api util',data);
	return axios.post(`/api/posts/user/${data.userId}`, data);
}