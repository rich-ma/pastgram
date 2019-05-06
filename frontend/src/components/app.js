import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
// import NavBarContainer from './nav/navbar_container';

import HomepageContainer from './homepage/homepage_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';


const App = () => {
	return (
		<div className='body'>
		<Switch>
		<AuthRoute path='/login' component={LoginFormContainer} />
		<AuthRoute path='/signup' component={SignupFormContainer} />
		<AuthRoute path="/" component={HomepageContainer} />
			</Switch>
		</div>
		
	);

	
}
export default App;