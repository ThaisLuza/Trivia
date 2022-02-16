import React, { Component } from 'react';
import PropTypes from 'prop-types';
import randomOrder from '../helpers/randomOrder';

const MAX_TIME = 1000; // equivalente a 1 segundo

class Question extends Component {
  constructor() {
    super();

    this.state = {
      answers: [],
      correctAnswer: '',
      isStyled: false,
      timer: 30,
      disabled: false,
      intervalId: null,
    };
    this.handleColor = this.handleColor.bind(this);
    this.handleStyle = this.handleStyle.bind(this);
  }

  componentDidMount() {
    const intervalId = setInterval(() => this.setState((prevState) => (
      { timer: prevState.timer - 1, intervalId })), MAX_TIME);
    const { question } = this.props;
    const questions = [...question.incorrect_answers, question.correct_answer];
    this.handleAnswer(question.type, questions, question.correct_answer);
  }

  componentDidUpdate(_prevProp, prevState) {
    if (prevState.timer === 1) {
      clearInterval(prevState.intervalId);
      this.handleDisable();
    }
  }

  handleDisable = () => {
    this.setState({ disabled: true });
  };

  handleAnswer = (type, questions, correctAnswer) => {
    this.setState({ answers: randomOrder(type, questions), correctAnswer });
  };

  handleColor(answer) {
    const { correctAnswer } = this.state;
    if (correctAnswer === answer) {
      return 'correctAnswer';
    }
    return 'wrongAnswer';
  }

  handleStyle() {
    this.setState({
      isStyled: true,
    });
  }

  render() {
    const { question } = this.props;
    const { answers, correctAnswer, isStyled, disabled, timer } = this.state;
    return (
      <section>
        <h3 data-testid="question-category">{ question.category }</h3>
        <p data-testid="question-text">{ question.question }</p>
        <div data-testid="answer-options">
          {answers.map((answer, index) => (
            <button
              type="button"
              key={ answer }
              data-testid={ answer === correctAnswer
                ? 'correct-answer'
                : `wrong-answer-${index}` }
              onClick={ this.handleStyle }
              className={ isStyled ? this.handleColor(answer) : '' }
              disabled={ disabled }
            >
              {answer}
            </button>
          ))}
        </div>
        <section>
          TEMPO:
          {' '}
          {timer}
        </section>
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    incorrect_answers: PropTypes.arrayOf(PropTypes.any).isRequired,
    correct_answer: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default Question;
