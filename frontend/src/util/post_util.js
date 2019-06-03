import React from 'react';

export const getDate = (postDate) => {
	const now = new Date();
	const minDiff = ((now.getTime() - postDate.getTime()) / 60000);
	const hourDiff = Math.floor(minDiff / 60);
	const dayDiff = Math.floor(hourDiff/24);
	const yearsDiff = now.getFullYear() - postDate.getFullYear();
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let date;

	if (yearsDiff > 0) {
		date = months[Date.getMonth()] + ' ' + postDate.getDate() + ',' + postDate.getFullYear();
	} else if (hourDiff < 1) {
		date = Math.ceil(minDiff) + ' minutes ago';
		if (Math.floor(minDiff) === 1) date = 'a minute ago';
		if(Math.floor(minDiff) === 0) date = 'just now';
	} else if (hourDiff < now.getHours() && hourDiff === 1) {
		date = 'an hour ago';
	} else if (hourDiff < now.getHours() && hourDiff > 1) {
		date = hourDiff + ' hours ago';
	} else if (dayDiff === 1) {
		date = 'yesterday';
	} else if (dayDiff < 7) {
		date = dayDiff + ' days ago';
	} else {
		date = months[postDate.getMonth()] + ' ' + postDate.getDate();
	}

	return date;
}

export const profile = (user) => (
			<div className='post-profile'>
				<div className='post-profile-img-container'>
					<img src={user.avatarUrl} alt='user-avatar'/>
				</div>
				<h2 className='post-profile-name'>{user.username}</h2>
			</div>
		)
		
		export const postImage = (post) => (
			<div className='post-show-img-container'>
				<img className='post-show-img' src={post.url} alt='post' />
			</div>
		)