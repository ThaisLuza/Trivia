import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchQuestions, tokenFetch } from '../services/fetchs';
import { updateToken } from '../redux/actions';
import Loading from '../components/Loading';

const FAIL_REQUEST = 3;

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      loading: true,
    };
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

  render() {
    const { questions, loading } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : <Question question={ questions[0] } />}
      </>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  newToken: PropTypes.func.isRequired,
};

const mapStateToProps = ({ token }) => ({ token });
const mapDispatchToProps = (dispatch) => ({
  newToken: (token) => dispatch(updateToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
