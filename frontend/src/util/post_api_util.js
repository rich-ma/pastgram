import axios from 'axios';

export const getPostShow = postId => {
	return axios.get(`/api/posts/${postId}`);
}

export const getPosts = reqData => {
	return axios.post('/api/posts/', reqData);
}

export const createPost = data => {
	return axios.post('/api/posts/new', data);
}

export const addLike = data => {
	return axios.post(`/api/posts/like/${data.postId}`, data)
}

export const removeLike = data => {
	return axios.post(`/api/posts/unlike/${data.postId}`, data);
}

export const fetchUserPosts = data => {
	return axios.post(`/api/posts/user/${data.userId}`, data);
}

export const seedLikes = () => {
	console.log('seeding');
	return axios.post('/api/posts/seed');
}