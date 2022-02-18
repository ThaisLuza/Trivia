import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const COUNT = 3;
class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    return (
      <>
        <Header />
        {assertions < COUNT ? (
          <span data-testid="feedback-text">Could be better...</span>
        ) : (
          <span data-testid="feedback-text">Well Done!</span>
        ) }
        <h1 data-testid="feedback-text"> Teste da Página de Feedback</h1>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
