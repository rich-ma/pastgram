import React from 'react';
import ReactDOM from 'react-dom';
import Root from'./components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
	let store;

	//if there is a token from a returning user(could be valid or expired)
	if(localStorage.jwtToken){	
		//set token as a header for all axios requests
		setAuthToken(localStorage.jwtToken);

		//decode the token to get user info
		const decodedUser = jwt_decode(localStorage.jwtToken);

		//create a preconfigured state we can add to our store
		const preloadedState = { 
			session: {
				isAuthenticated: true, 
				user: decodedUser 
			}
		};

		store = configureStore(preloadedState);

		const currentTime = Date.now()/1000;

		//if the user's token expired, logs them out and redirects to login page
		if(decodedUser.exp < currentTime){
			store.dispatch(logout());
			window.location.href = '/login';
		}

	} else {
		//starts with emtpy store for first time user
		store = configureStore({});
	}

	const root = document.getElementById('root');

	ReactDOM.render(<Root store={store} />, root);

})