import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
// import NavBarContainer from './nav/navbar_container';

import HomepageContainer from './homepage/homepage_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import Footer from './homepage/footer';

const App = () => {
	return (
		<div className='body'>
			<Switch>
				<AuthRoute exact path='/login' component={LoginFormContainer} /> 
				<AuthRoute exact path='/signup' component={SignupFormContainer} /> 
				<Route exact path="/" component={HomepageContainer} />
			</Switch>
			<Route path='/' component={Footer} />
		</div>
	);
}
export default App;