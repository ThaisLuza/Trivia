import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { playerLoginInputs, updateToken } from '../redux/actions';
import { tokenFetch } from '../services/fetchs';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      buttonIsDisabled: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => this.loginValidation());
  }

  loginValidation = () => {
    const MIN_LENGTH = 1;
    const { email, name } = this.state;
    const emailCheck = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    // E-mail Validation Source: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const nameCheck = name.length >= MIN_LENGTH;
    this.setState({ buttonIsDisabled: !(emailCheck && nameCheck) });
  }

  async handleClick() {
    const { playerInfo } = this.props;
    const { name, email } = this.state;
    const { playerToken } = this.props;
    playerInfo({ name, email });
    playerToken(await tokenFetch());
    this.setState({ redirect: true });
  }

  render() {
    const { name, email, buttonIsDisabled, redirect } = this.state;
    const { history } = this.props;
    if (redirect) return <Redirect to="/game" />;
    return (
      <div>
        <form
          onSubmit={ (event) => event.preventDefault() }
        >
          <label htmlFor="name-input">
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

          <label htmlFor="email-input">
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
            type="submit"
            data-testid="btn-play"
            disabled={ buttonIsDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
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

Login.propTypes = {
  playerInfo: PropTypes.func.isRequired,
  playerToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  playerInfo: (info) => dispatch(playerLoginInputs(info)),
  playerToken: (token) => dispatch(updateToken(token)),
});

export default connect(null, mapDispatchToProps)(Login);
