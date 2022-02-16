import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import randomOrder from '../helpers/randomOrder';
import gamePoints from '../services/gamePoints';
import { updateScore } from '../redux/actions';

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
      difficulty: '',
    };
    this.handleColor = this.handleColor.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
  }

  componentDidMount() {
    const intervalId = setInterval(() => this.setState((prevState) => (
      { timer: prevState.timer - 1, intervalId })), MAX_TIME);
    const { question } = this.props;
    const questions = [...question.incorrect_answers, question.correct_answer];
    this.handleAnswer(question.type,
      questions,
      question.correct_answer,
      question.difficulty);
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

  handleAnswer = (type, questions, correctAnswer, difficulty) => {
    this.setState({ answers: randomOrder(type, questions), correctAnswer, difficulty });
  };

  handleColor(answer) {
    const { correctAnswer } = this.state;
    if (correctAnswer === answer) {
      return 'correctAnswer';
    }
    return 'wrongAnswer';
  }

  handleLocalStorage(answer) {
    this.setState({
      isStyled: true,
    });
    const { correctAnswer, timer, difficulty } = this.state;
    const { name, dispatchScore } = this.props;
    console.log(name);
    if (correctAnswer === answer) {
      const ranking = {
        name,
        score: gamePoints(timer, difficulty),
      };
      dispatchScore(ranking.score);
      console.log(ranking.score);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
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
              onClick={ () => this.handleLocalStorage(answer) }
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
  dispatchScore: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  question: PropTypes.shape({
    incorrect_answers: PropTypes.arrayOf(PropTypes.any).isRequired,
    correct_answer: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (payload) => dispatch(updateScore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
