import { NEXT_QUESTION } from '../actions';

const INITIAL_STATE = { next: false };

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEXT_QUESTION:
    return {
      ...state,
      next: action.payload,
    };
  default:
    return state;
  }
};

export default game;
