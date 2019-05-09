import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

//Passed in from parent component or from mSTP
//redirects users if they are already logged in
const Auth = ({ component: Component, path, loggedIn, exact }) => (
	<Route path={path} exact={exact} render={(props) => (
		!loggedIn ? (
			<Component {...props} />
		) : (
			//redirect to the posts page if user is authenticated
			<Redirect to="/" />
		)
	)} />
);

//ensure that users can only access certain pages if they are logged in
const Protected = ({ component: Component, loggedIn, ...rest}) => (
	<Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        // Redirect to the signup page if the user is already authenticated
        <Redirect to="/signup" />
      )
    }
  />
);

const mSTP = state => (
	{
		loggedIn: state.session.isAuthenticated
	}
);

export const AuthRoute = withRouter(connect(mSTP, {})(Auth));
export const ProtectedRoute = withRouter(connect(mSTP, {})(Protected));