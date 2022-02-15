import { QUESTIONS } from '../actions/index';

const INITIAL_STATE_QUESTIONS = {
  asks: [],
};

const questionsReducer = (state = INITIAL_STATE_QUESTIONS, action) => {
  switch (action.type) {
  case QUESTIONS:
    return {
      asks: [...action.asks],
    };
  default:
    return state;
  }
};

export default questionsReducer;
