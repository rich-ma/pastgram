import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import Homepage from './homepage/homepage';
import loginFormContainer from './session/login_form_container';
import signupFormContainer from './session/signup_form_container';


const App = () => {
	<Switch>
		<AuthRoute exact path="/" component={Homepage} />
		<AuthRoute exact path='/login' component={loginFormContainer} />
		<AuthRoute exact path='/signup' component={signupFormContainer} />
	</Switch>
}

export default App;