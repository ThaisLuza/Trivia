import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchQuestions, tokenFetch } from '../services/fetchs';
import { updateToken } from '../redux/actions';
import Loading from '../components/Loading';
import './Game.css';

const FAIL_REQUEST = 3;

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      loading: true,
      index: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { token, newToken } = this.props;
    const responseAPI = await fetchQuestions(token);
    if (responseAPI.response_code === FAIL_REQUEST) {
      newToken(await tokenFetch());
      this.getQuestions();
    } else this.setState({ questions: [...responseAPI.results], loading: false });
  }

  handleClick() {
    const { index } = this.state;
    const { history } = this.props;
    const MAX_ANSWERS = 4;
    if (index === MAX_ANSWERS) history.push('/feedback');
    this.setState((prevState) => ({
      index: prevState.index + 1,
      loading: true,
    }), () => this.setState({ loading: false }));
  }

  render() {
    const { questions, loading, index } = this.state;
    const { next } = this.props;
    return (
      <>
        <Header />
        {loading && <Loading />}
        {!loading && <Question question={ questions[index] } />}
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleClick }
          className={ next ? 'isVisible' : 'invisible' }
        >
          Next
        </button>
      </>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  newToken: PropTypes.func.isRequired,
  next: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ token, game }) => ({ token, next: game.next });
const mapDispatchToProps = (dispatch) => ({
  newToken: (token) => dispatch(updateToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
