import React from 'react';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      buttonIsDisabled: true,
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

  render() {
    const { name, email, buttonIsDisabled } = this.state;

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
            data-testid="btn-play"
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
