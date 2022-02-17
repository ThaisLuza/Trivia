import { combineReducers } from 'redux';
import player from './login';
import token from './token';

const rootReducers = combineReducers({ player, token });

export default rootReducers;
