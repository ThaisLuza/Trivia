import { combineReducers } from 'redux';
import player from './login';
import token from './token';
import game from './game';

const rootReducers = combineReducers({ player, token, game });

export default rootReducers;
