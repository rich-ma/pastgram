import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
	};

	handleSubmit(e){
		e.preventDefault();
		let user = {
			email: this.state.email,
			password: this.state.password,
			username: this.state.username
		}

		this.props.processForm(user);
	}

	renderErrors(){
		return (
			<ul>
				{Object.keys(this.state.errors).map((error, i) => (
					<li key={`error-${i}`}>
						{this.state.errors[error]}
					</li>
				))}
			</ul>
		);
	};

	render(){
		let username = (
			<
		)



	}
}