import React from 'react';
import { withRouter } from 'react-router-dom';
import '../css/session.css';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
			password: '',
			password2: '',
			email: ''
    };
		this.handleSubmit = this.handleSubmit.bind(this);
	};

  componentWillReceiveProps(nextProps) {

			if (nextProps.currentUser === true) {
				this.props.history.push('/');
			}

			this.setState({
				errors: nextProps.errors
			})
		
  }

	handleSubmit(e){
		e.preventDefault();
		let user = {
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
			username: this.state.username
		}

		this.props.processForm(user, this.props.history);
	};

	renderErrors(){
		if(!this.state.errors) return null;
		return (
			<ul className='session-errors'>
				{Object.keys(this.state.errors).map((error, i) => (
					<li key={`error-${i}`}>
						{this.state.errors[error]}
					</li>
				))}
			</ul>
		);
	};

	update(field){
		return e => this.setState({[field]: e.currentTarget.value});
	};

	render(){
		const username = this.props.formType === 'login' ? null : (
			<input type='text' 
			onChange={this.update('username')}
			className='session-input' 
			placeholder='Username'
			/>
		);
		
		const welcome = this.props.formType === 'login' ? null : (
			<h2 className='session-welcome'>Sign up to see photos and videos from your friends.</h2>
		);

		const password2 = this.props.formType === 'login' ? null : (
			<input type="password" value={this.state.password2}
						onChange={this.update('password2')} className="session-input"
						placeholder='Confirm Password'/>
		)

		return (
			<div className='session-wrapper'>
				<div className='session-container'>
					<h1 className="session-title">Postgram</h1>
					{welcome}
					<br/>
					{this.renderErrors()}
					<form onSubmit={this.handleSubmit} className="session-form-box">
						<div className="session-errors">
						</div>

						{username}	

						<input type="text" value={this.state.email}
							onChange={this.update('email')} className="session-input" placeholder='Email' />
							
						<input type="password" value={this.state.password}
							onChange={this.update('password')} className="session-input"
							placeholder='Password'/>

						{password2}

						<input className="session-submit" type="submit" value={this.props.formType === 'login' ? 'Log In' : 'Sign up'} />
					</form>
				</div>
				<div className='session-link-container'> {
						(this.props.formType === 'signup' ? "Have an account?  " : "Don't have an account?  ")
					} {
						this.props.navLink
					} 
					</div>
			</div>
		)
	}
}

export default withRouter(SessionForm);