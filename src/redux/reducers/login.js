import { USER } from '../actions/index';

const INITIAL_STATE_FIELDS = {
  name: '',
  email: '',
};

const reducerLogin = (state = INITIAL_STATE_FIELDS, action) => {
  switch (action.type) {
  case USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  default:
    return state;
  }
};

export default reducerLogin;
