import { combineReducers } from 'redux';
import login from './login';
import token from './token';

const rootReducers = combineReducers({ login, token });

export default rootReducers;
