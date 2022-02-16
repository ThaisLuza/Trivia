export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const SCORE = 'SCORE';

export const playerLoginInputs = (payload) => ({
  type: PLAYER_LOGIN,
  payload,
});

export const updateScore = (payload) => ({
  type: SCORE,
  payload,
});

export const updateToken = (payload) => ({
  type: TOKEN_REQUEST,
  payload,
});
