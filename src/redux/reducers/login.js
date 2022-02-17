import { PLAYER_LOGIN, SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  email: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case SCORE:
    return {
      ...state,
      score: action.payload + state.score,
    };
  default:
    return state;
  }
};

export default login;
