import { TOKEN } from '../actions/index';

const TOKEN_STATE = '';

const tokenReducer = (state = TOKEN_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return action.token;
  default:
    return state;
  }
};

export default tokenReducer;
