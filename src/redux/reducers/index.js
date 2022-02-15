import { combineReducers } from 'redux';
import loginReducer from './login';
import questionsReducer from './questions';
import tokenReducer from './token';

const rootReducer = combineReducers({
  login: loginReducer,
  question: questionsReducer,
  token: tokenReducer,
});

export default rootReducer;
