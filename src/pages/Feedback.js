import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const COUNT = 3;
class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    console.log(score);
    return (
      <>
        <Header />
        {assertions < COUNT ? (
          <span data-testid="feedback-text">Could be better...</span>
        ) : (
          <span data-testid="feedback-text">Well Done!</span>
        ) }
        <span>Placar final:</span>
        <h3 data-testid="feedback-total-score">{score}</h3>
        <span>Acertos:</span>
        <h4 data-testid="feedback-total-question">{assertions}</h4>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
