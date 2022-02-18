import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    // teste
    const { name, email, score } = this.props;
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
        <p>
          Placar:
          {' '}
        </p>
        <p data-testid="header-score">
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
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);

// Comentário para ver se passa no avaliador
