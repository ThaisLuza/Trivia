import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    console.log(score);
    const hashImage = md5(email).toString();
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="Avatar"
          src={ `https://www.gravatar.com/avatar/${hashImage}` }
        />
        <p data-testid="header-player-name">
          Nome:
          {' '}
          {name}
        </p>
        <p data-testid="header-score">
          Placar:
          {' '}
          {score}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  score: state.login.score,
});

export default connect(mapStateToProps)(Header);
