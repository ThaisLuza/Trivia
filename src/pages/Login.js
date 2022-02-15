import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser, createToken, triviaFetch } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      buttonIsDisabled: true,
      redirect: false,
      token: '',
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => this.loginValidation());
  }

  loginValidation = () => {
    const MIN_LENGTH = 1;
    const { email, name } = this.state;

    const emailCheck = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    // Checking e-mail
    // SOURCE: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const nameCheck = name.length >= MIN_LENGTH;
    this.setState({ buttonIsDisabled: !(emailCheck && nameCheck) });
  }

  handleClick = (name, email, token) => {
    const { dispatchLoginInfo, fetchQuestions, dispatchToken } = this.props;
    dispatchLoginInfo(name, email);
    fetchQuestions();
    dispatchToken(token);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { name, email, buttonIsDisabled, redirect, token } = this.state;
    const { history } = this.props;
    if (redirect) {
      return (<Redirect to="/game" />);
    }
    return (
      <div>
        <form>
          <label htmlFor="input-player-name">
            Nome:
            <input
              type="text"
              id="input-player-name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>

          <label htmlFor="input-gravatar-email">
            E-mail:
            <input
              type="text"
              id="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>

          <button
            type="button"
            disabled={ buttonIsDisabled }
            onClick={ () => this.handleClick(name, email, token) }
            data-testid="btn-play"
          >
            Play
          </button>
        </form>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ () => {
            history.push('/options');
          } }
        >
          Configurações
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginInfo: (name, email) => dispatch(createUser(name, email)),
  fetchQuestions: () => dispatch(triviaFetch()),
  dispatchToken: (token) => dispatch(createToken(token)),
});

Login.propTypes = {
  dispatchLoginInfo: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  dispatchToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
